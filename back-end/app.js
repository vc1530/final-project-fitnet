require("dotenv").config({ silent: true })

const express = require("express") 
const app = express() 
const path = require("path")
const port = 3000 

const multer = require("multer") 
const cors = require("cors")
const axios = require("axios") 
const morgan = require("morgan") 
const bodyParser= require('body-parser');

app.use(morgan("dev")) 
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(bodyParser.urlencoded());
app.use(cors()) 

const mongoose = require('mongoose');

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

const allWorkouts = require("./mock_workouts.json")
const allPosts = require("./mock_posts.json") 
const allUsers = require("./mock_users.json") 

const register = require('./routes/register') 
const posts = require('./routes/posts')
const workouts = require('./routes/workouts') 
const workout = require('./routes/workout') 
const playlists = require('./routes/playlists') 
const users = require('./routes/users') 

app.use('/', register) 
app.use('/', posts)  
app.use('/', workouts) 
app.use('/', workout)
app.use('/', playlists)
app.use('/', users) 

app.use("/static", express.static("public"))

app.get("/", (req, res) => {
    res.send("This is the root directory link for our app")
})

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

app.post("/save-changes", upload.single('image'), async(req, res) => {
  try { 
    if (req.file) 
      console.log('size:', req.file.size)
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

app.post("/post", upload.single('image'),(req, res, err) => {
  if(!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
    res.send({msg: 'Only image files (jpg, jpeg, png) are allowed!'})
  }
  else{
    const image = req.file.filename;
    const id = 1;
    const sqlInsert = "UPDATE images SET 'image' = ? WHERE id = ?;"
    RTCPeerConnection.query(sqlInsert,[image, id], (err, result)=>{
      if(err){
        console.log(err)
        res.send({
          msg: err
        })
      }
      if(result){
        res.send({
          data: result,
          msg: 'Your image has been updated!'
        });
      }
    });
  }
});

module.exports = app
