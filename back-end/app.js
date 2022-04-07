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

app.post("/save-changes", upload.single('image'), async(req, res) => {
  try { 
    if (req.file) 
      console.log('size:', req.file.size)
    //the user id is just the index of the user in mock_users for now. 
    //during database integration, we will assign real IDs to each user 
    const user = allUsers[req.body.uid] 
    if (!user) { 
      res
      .status(400) 
      .json({
        success: false, 
        status: "user " + req.params.id + " was not found",
      })
    }
    else {
      //fake editing of user's information 
      user.name = req.body.name
      user.username = req.body.username 
      user.bio = req.body.bio 
      user.email = req.body.email 
      user.password = req.body.password 
      //don't worry about uploading pics for now 
      //user.profile_pic = req.file
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

app.get("/posts", async(req, res) => { 
  try { 
    res.json({ 
      success: true, 
      posts: allPosts, 
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

app.get("/workouts", async(req, res) => { 
  try { 
    res.json({ 
      success: true, 
      workouts: allWorkouts, 
      status: 'retrieving workouts from database succeeded', 
    })
  }
  catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      success: false, 
      error: err, 
      status: 'retrieving workouts from database failed', 
    })
  }
}) 

app.post("/new-post", upload.single('image'), (req, res) =>{
  try {  
    //fake editing database — database integration not completed
    allPosts.unshift({ 
      username: req.body.username, 
      description: req.body.description, 
      //dummy picture until data base integration completed
      picture: 'http://dummyimage.com/140x100.png/cc0000/ffffff' 
   })
    res.json({ 
      success: true, 
      newpost: req.body, 
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

//more secure way of retrieving a user's information 
//used for settings and myprofile
app.get('/uid/:uid', async(req, res) => { 
  try { 
    const user = allUsers[req.params.uid]
    if (!user) { 
      res
      .status(400) 
      .json({
        success: false, 
        status: "user " + req.params.id + " was not found",
      })
    }
    else 
      res.json( { 
        success: true, 
        user: { 
          name: user.name, 
          username: user.username, 
          bio: user.bio, 
          profile_pic: user.profile_pic, 
          email: user.email, 
          password: user.password 
        }, 
        status: "retrieving user " + req.params.id + " succeeded"
      })
  } catch(err) { 
    console.error(err)
    res
    .status(400)
    .json({ 
      success: false, 
      error: err, 
      status: "retreiving user " + req.params.id + " failed" 
    })
  }
}) 

app.get("/:username", async(req, res) => { 
  try { 
    const user = allUsers.find(user => user.username == req.params.username) 
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
        user: { 
          name: user.name, 
          username: user.username, 
          bio: user.bio, 
          profile_pic: user.profile_pic, 
          email: user.email, 
          password: user.password 
        }, 
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

app.get("/w/:id", async(req, res) => { 
  try {
    const workout = allWorkouts.find(workout => workout.id == req.params.id)
    if (!workout) { 
      res
      .status(400) 
      .json({ 
        success: false, 
        status: "workout " + req.params.id + " was not found", 
      })
    }
    else { 
      res.json({ 
        success: true, 
        workout: { 
          workout_name: workout.workout_name,  
          workout_description: workout.workout_description, 
        }, 
        status: 'retrieving workout ' + req.params.id + ' succeeded', 
      })
    } 
  }
  catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      success: false, 
      error: err, 
      status: 'retreiving workout ' + req.params.id + ' failed'
    })
  }
})

app.post("/w/:id", (req, res) => { 
  try { 
    const workout = allWorkouts.find(workout => workout.id == req.params.id)
    if (!workout) { 
      res
      .status(400) 
      .json({ 
        success: false, 
        status: "workout " + req.params.id + " was not found", 
      })
    }
    else {
      //fake editing database — database integration not completed
      workout.workout_name = req.body.workout_name
      workout.workout_description = req.body.workout_description
      res.json({ 
        success: true, 
        workout: workout, 
        status: 'editing workout ' + req.params.id + ' succeeded'
      })
    } 
  }
  catch (err) { 
    console.error(err) 
    res.status(400).json( { 
      success: false, 
      error: err, 
      status: 'editing workout ' + req.params.id + ' failed'
    })
  }
}) 

module.exports = app