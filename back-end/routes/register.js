const express = require("express");
const router = express.Router();

const { User } = require('../models/User') 

router.post('/register', async(req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if(user) {
      return res.status(401).json({
        success: false,
        status: 'Email already exists.'
      })
    } else { 
      const user = await User.findOne({username: req.body.username}) 
      if (user) { 
        return res.status(402).json({ 
          success: false,
          status: 'Username already exists.'
        })
      }
    }
    const newUser = await User.create({
      name: req.body.firstName + " " + req.body.lastName, 
      username: req.body.username,
      bio: "",
      email: req.body.email,
      password: req.body.password,
      profile_pic: "",
    })
    return res.json({ 
      success: true, 
      status: "User" + req.body.username + " successfully register", 
      user: newUser, 
    })
  }
  catch(err) {
    console.error(err)
  }
})

module.exports = router; 