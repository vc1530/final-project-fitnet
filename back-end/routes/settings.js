const express = require("express");
const router = express.Router();

const { User } = require('../models/User') 

app.get("/users", async(req, res) => { 
    try { 
      const users = await User.find({}) 
      res.json({ 
        success: true, 
        users: users, 
        status: 'retrieving posts from database succeeded', 
      })
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: "retrieving posts from database failed", 
      })
    }
  })

app.get("/new-user", async(req, res) => { 
  const user = await User.create({ 
  // id??
    name: "Sydney", 
    username: "sjp655", 
    bio:"...", 
    email:"sjp655@nyu.edu",
    password:"password",
    // profile_pic: "http://dummyimage.com/140x100.png/cc0000/ffffff"
  })
  return res.json ({ 
    success: true, 
    user: user, 
    status: "yay it worked", 
  })
})

app.post("/save-changes", upload.single('image'), async(req, res) => {
    try { 
      // if (req.file) 
      //   console.log('size:', req.file.size)
  
      //the user id is just the index of the user in mock_users for now. 
      //during database integration, we will assign real IDs to each user 
  
      const user = allUsers[req.body.uid] 
      const User = await User.findOne({ _id: req.params._id })
  
      if (!user) { 
        res
        .status(400) 
        .json({
          success: false, 
          status: "user " + req.params._id + " was not found",
        })
      }
      else {
        //editing of user's information 
        user = new User({ // does this create a new user in database vs editing their info 
          name: req.body.name,
          username: req.body.username,
          bio: req.body.bio,
          email: req.body.email,
          password: req.body.password,
          profile_pic: req.file,
        })
        await user.save()
        res.send(user)
    
        res.json({ 
          success: true, 
          user: user, 
          status: "saving changes in settings succeeded",   
        })
      } 
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: "saving changes in settings failed", 
      })
    }
  })
  module.exports = this.router