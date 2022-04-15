const { interfaces } = require('mocha')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//const { workoutSchema } = require('./Workout')

const userSchema = new Schema(
  {
    // id: { 
    //   type: mongoose.Schema.Types.ObjectId, 
    //   required: true, 
    // },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: { 
      type: String, 
      required: true, 
    }, 
    password: {
        type: String,
        required: true,
      },
    profile_pic: {
      type: Buffer,
      required: true,
    },
    workouts: { 
      type: Array, 
      required: false, 
    }
  },
)

// create mongoose Model
const User = mongoose.model('User', userSchema)

// export the model so other modules can import it
module.exports = {
  User,
}