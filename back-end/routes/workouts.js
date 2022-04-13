const express = require("express");
const router = express.Router();
const allWorkouts = require("../mock_workouts.json")

const { User } = require('../models/User')
const { Workout } = require('../models/Workout') 

router.get("/workouts", async(req, res) => {
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

  module.exports = router; 