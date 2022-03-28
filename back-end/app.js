// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests

/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */



// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))

//Route for root link to the website
app.get("/", (req, res) => {
    res.send("This is the root directory link for our app")
})

app.get("/Create-a-new-post", (req, res) => {
    // assemble an object with the data we want to send
    const body = {
      title: "Create a new post!",
      heading: "New Post!",
      image: "",
      message: "Image will be uploaded here",
      message: "Description will be uploaded here",
    }
})    

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!



// // TRYING TO DEAL WITH UPLOADING PROFILE PHOTO
// // enable file uploads saved to disk in a directory named 'public/uploads'
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/uploads")
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//       )
//     },
//   })

// const upload = multer({ storage: storage })

// // route for HTTP POST requests for /upload-example
// app.post("/upload-example", upload.array("my_files", 3), (req, res, next) => {
//     // check whether anything was uploaded
//     if (req.files) {
//       // success! send data back to the client, e.g. some JSON data
//       const data = {
//         status: "all good",
//         message: "yup, the files were uploaded!!!",
//         files: req.files,
//       }
//       res.json(data) // send respose
//     }
//   })