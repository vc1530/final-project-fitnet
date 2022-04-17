const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const passport = require("passport")
router.use(passport.initialize())
const { jwtOptions, jwtStrategy } = require("../jwt-config.js") 
passport.use(jwtStrategy)

const { User } = require('../models/User') 

router.post('/loginVerify', async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        .then(user => {
        if(!user) {
          return res.status(401).json({
            success: false,
            status: 'An account with this username does not exist.'
          })
        } else {
          if (user.password !== req.body.password) 
            return res.status(402).json({ 
              success: false, 
              status: "Wrong password" 
            })
          else { 
            const payload = { id: user._id }
            const token = jwt.sign(payload, jwtOptions.secretOrKey)
            return res.json({ 
                success: true, 
                token: token, 
                id: user._id, 
                status: "user verified" 
            }) 
          } 
        }
      })
    }
    catch(err) {
      console.error(err)
      res.status(400).json({ 
        success: false, 
        status: "Login in failed"
      })
    }
  })

module.exports = router; 