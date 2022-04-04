// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")
const port = 3000 

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const cors = require("cors")
const axios = require("axios") // middleware for making requests to APIs
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests

//mock databases 
const allWorkouts = require("./mock_workouts.json")
const allPosts = require("./mock_posts.json") 
const allUsers = require("./mock_users.json") 

require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

app.use(cors()) 

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))

//Route for root link to the website
app.get("/", (req, res) => {
    res.send("This is the root directory link for our app")
})

//const storage = multer.memoryStorage()
//enable file uploads saved to disk in a directory named 'public/uploads'
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

// route for HTTP POST requests for /upload-example
app.post("/upload-example", upload.array("my_files", 3), (req, res, next) => {
  console.log("a request")
  // check whether anything was uploaded
  if (req.files) {
    // success! send data back to the client, e.g. some JSON data
    const data = {
      status: "all good",
      message: "yup, the files were uploaded!!!",
      files: req.files,
    }
    res.json(data) // send respose
  }
})

app.post("/save-changes", upload.single('image'), (req, res, next) => {
  console.log('request:', req.body)
  if (req.file) 
    console.log('size:', req.file.size)
  res.json(req.body) 
})

app.get("/posts", async(req, res) => { 
  try { 
    res.json({ 
      posts: allPosts, 
      status: 'everything is working!', 
    })
  }
  catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      error: err, 
      status: "retrieving posts from database failed", 
    })
  }
})

app.get("/workouts", async(req, res) => { 
  try { 
    res.json({ 
      workouts: allWorkouts, 
      status: 'everything is working!', 
    })
  }
  catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      error: err, 
      status: 'retrieving workouts from database failed', 
    })
  }
}) 

app.post("/new-post", upload.single('image'), (req, res) =>{
  try { 
    console.log("new post received: ") 
    console.log(req.body) 
    res.json(req.body) 
    //fake editing database — database integration not completed
    // allPosts.unshift({ 
    //   username: "j.doe5", 
    //   description: req.body.description, 
    //   picture: 'http://dummyimage.com/140x100.png/cc0000/ffffff' 
    // })
  } catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      error: err, 
      status: 'uploading new post failed', 
    })
  }
})

app.get("/:username", async(req, res) => { 
  try { 
    const user = allUsers.find(user => user.username == req.params.username) 
    res.json( { 
      user: user, 
      status: "user" + req.params.username + "has been found"
    })
  } catch(err) { 
    console.error(err)
    res.status(400).json({ 
      error: err, 
      status: "retreiving user" + req.params.username + "failed" 
    })
  }
})

app.get("/w/:id", async(req, res) => { 
  try {
    const workout = allWorkouts.find(workout => workout.id == req.params.id)
    res.json({ 
      workout: workout,  
      status: 'workout ' + req.params.id + ' has been found!', 
    })
  }
  catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      error: err, 
      status: 'retreiving workout ' + req.params.id + ' failed'
    })
  }
})

app.post("/w/:id", (req, res) => { 
  try { 
    const workout = allWorkouts.find(workout => workout.id == req.params.id)
    //fake editing database — database integration not completed
    workout.workout_name = req.body.workout_name
    workout.workout_description = req.body.workout_description
    res.json({ 
      workout: workout, 
      status: 'workout ' + req.params.id + ' has been edited!'
    })
  }
  catch (err) { 
    console.error(err) 
    res.status(400).json( { 
      error: err, 
      status: 'editing workout ' + req.params.id + ' failed'
    })
  }
}) 

// // route for HTTP POST requests for /upload-example
app.post("/upload-example", upload.array("my_files", 3), (req, res, next) => {
  // check whether anything was uploaded
  if (!req.files) {
    // failure!
    const error = new Error("Please upload some files!")
    error.httpStatusCode = 400
    return next(error)
  } else {
    // success
    // send a message back to the client, for example, a simple JSON object
    const data = {
      status: "all good",
      message: "files were uploaded!!!",
      files: req.files,
    }
    res.json(data)
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!