const express = require("express");
const router = express.Router();
const multer = require("multer") 

const { Post } = require('../models/Post') 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
      // take apart the uploaded file's name so we can create a new one based on it
      const extension = path.extname(file.originalname)
      const basenameWithoutExtension = path.basename(file.originalname, extension)
      // create a new filename with a timestamp in the middle
      const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
      // tell multer to use this new filename for the uploaded file
      cb(null, newName)
    },
  })
  
  const upload = multer({ storage: storage })

const imageHandler = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file)
    fetch('http://localhost:3000/api/image',{
      method: 'POST',
      body: formData,
      headers:{
        'Accept': 'multipart/form-data',
      },
      credentials: 'include',
    })
    .then(res=>res.json())
    .then(res =>{
      setUploadStatus(res.msg);
  
    })
    .catch(error=>{
      console.error(error)
    })
  }

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