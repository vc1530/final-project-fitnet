const express = require("express");
const router = express.Router();

const { User } = require('../models/User') 

router.post('/p/:id', async(req, res) => { 
    try { 
      const user = await User.findById(req.body.uid)
      if (!user) res.status(400).json({
        success: false, 
        status: `posting playlist: user ${req.body.uid} not found`
      })
      else { 
        const workout = user.workouts.find(w => w._id == req.params.id)
        if (!workout) res.status(400).json({ 
          success: false, 
          status: `posting playlist: workout ${req.params.id} not found` 
        })
        else { 
          workout.playlist = req.body.playlist 
          const index = user.workouts.indexOf(user.workouts.find((w) => w._id == req.params.id))
          user.workouts[index] = workout
          await user.save() 

          res.json({ 
            success: true, 
            playlist: workout.playlist, 
            status: 'uploading playlist for workout ' + req.params.id + ' succeeded', 
          })
        }
      } 
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: 'uploading playlist for workout ' + req.params.id + ' failed'
      })
    }
  })
  
module.exports = router; 