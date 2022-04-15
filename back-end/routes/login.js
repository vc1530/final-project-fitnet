const express = require("express");
const router = express.Router();

const { User } = require('../models/User') 

router.post('/login', (req, res) => {
    try {
        const user = User.findOne({email: req.body.email, password: req.body.password }).then(user => {
        if(!user) {
          return res.status(400).json({
            success: false,
            status: 'Email and Password Combo Wrong.'
          })
        } else {
            return res.json({ 
                success: true, 
                login: post, 
                status: "user verified" 
            }) 
        }
      })
    }
    catch(err) {
      console.error(err)
    }
  })

module.exports = router; 