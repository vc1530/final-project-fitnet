const express = require("express");
const router = express.Router();
const multer = require("multer") 
const allUsers = require("../mock_users.json") 

const { User } = require('../models/User') 

// do we need this? 
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

router.get("/users", async(req, res) => { 
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

// router.post("/save-changes", upload.single('image'), async(req, res) => {
//     //   const user = allUsers[req.body.uid] 
//     const user = await User.findById({ _id})
//     try {
//       if (!user) { 
//         res
//         .status(400) 
//         .json({
//           success: false, 
//           status: "user " + req.params._id + " was not found",
//         })
//       }
//       else {
//         //editing of user's information 
//         user = new User({ // does this create a new user in database vs editing their info 
//           name: req.body.name,
//           username: req.body.username,
//           bio: req.body.bio,
//           email: req.body.email,
//           password: req.body.password,
//           profile_pic: req.file,
//         })
//         await user.save()
//         res.send(user)
    
//         res.json({ 
//           success: true, 
//           user: user, 
//           status: "saving changes in settings succeeded",   
//         })
//       } 
//     }
//     catch (err) { 
//       console.error(err) 
//       res.status(400).json({ 
//         success: false, 
//         error: err, 
//         status: "saving changes in settings failed", 
//       })
//     }
//   })

//   module.exports = router

router.post("/save-changes", upload.single('image'), async(req, res) =>{
    try {
        const _id = '625763d1974d42cfce0fa342' 
        const user = await User.findById(_id)
        if (!user) { 
            res
            .status(400) 
            .json({
              success: false, 
              status: "user " + req.params._id + " was not found",
            })
        }
        if(req.params.id == 'new') { 
            const user = await User.create({ 
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
        else { // if user is already there then we edit there info??
            user.name = req.body.name
            user.username = req.body.username
            user.bio = req.body.bio
            user.email = req.body.email
            user.password = req.body.password
            user.profile_pic = req.file
            await user.save()

            res.json({ 
                success: true, 
                user: user, 
                status: 'editing user ' + req.params.id + ' succeeded'
              })
        }
    } 
    catch (err) {
        console.error(err)
        res.status(400).json( {
            success: false,
            error: err,
            status: 'editing user ' + req.params.name + ' failed'
        })
    }
})