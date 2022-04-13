const express = require("express");
const router = express.Router();

const { Post } = require('../models/Post') 

router.post("/new-post", upload.single('image'), async(req, res) =>{
    try {  
      const post = await Post.create({ 
        username: req.body.username, 
        description: req.body.description, 
        picture: 'http://dummyimage.com/140x100.png/cc0000/ffffff' 
      })
      return res.json({ 
        success: true, 
        newpost: post, 
        status: "uploading new post succeeded" 
      }) 
    } catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: 'uploading new post failed', 
      })
    }
  })

module.exports = router; 