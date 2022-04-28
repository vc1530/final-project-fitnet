const appendField = require('append-field');
const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require("path")
const fs = require('fs')
const {Post} = require('../models/Post') 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'routes/uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage:storage});

router.get('/newPost', (req, res)=>{
    imgModel.find({}, (err, items)=>{
        if(err){
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else{
            res.render('imagesPage', {items:items});
        }
    });
});

router.post('/newPost', upload.single('image'), async(req, res, next)=>{
    try { 
      const newPost = await Post.create({
        user: req.body.user,
        description: req.body.description,
      })
      if(req.file){
          newPost.picture = {
              data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
              contentType: `image/png` 
          }
          await newPost.save()
      }   
      res.json({ 
        success:true, 
        status:`post has been uploaded`, 
        newpost: newPost, 
      })
    }  catch (err) { 
      res.status(400).json({ 
        success: false, 
        status: `uploading post failed`, 
      })
    }
    /*
    console.log(upload)
    console.log("////////////////")
    console.log(upload.storage)
    console.log("////////////////")
    console.log(upload.storage.getFilename)
    console.log("///////////////")
    console.log(req.file.filename)
    console.log("///////////////")
    console.log(req.file.originalname)
    console.log("///////////////")
    */
    /*var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img:{
            data: file.readFileSync(path.join(__dirname + '/upload/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    }
    imgModel.creat(obj, (err, item)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('newPost');
        }
    });
    */
});

module.exports = router;