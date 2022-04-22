const express = require("express");
const router = express.Router();

const { User } = require('../models/User')

router.get("/users", async(req, res) => { 
    try { 
      const users = await User.find({}) 
      res.json({ 
        success: true, 
        users: users, 
        status: 'retrieving users from database succeeded', 
      })
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: "retrieving users from database failed", 
      })
    }
  })
  
  router.get("/:username", async(req, res) => {
    try { 
      const user = await User.findOne( {username : req.params.username } ) 
      if (!user) { 
        res
        .status(400) 
        .json({ 
          success: false, 
          status: "user " + req.params.username + " was not found", 
        })
      }
      else {
        res.json({ 
          success: true, 
          user: user, 
          status: "retrieving user " + req.params.username + " succeeded"
        })
      } 
    } catch(err) { 
      console.error(err)
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: "retreiving user " + req.params.username + " failed" 
      })
    }
  })

  module.exports = router; 