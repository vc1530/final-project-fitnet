const express = require('express');
const router = express.Router();

const { User } = require('../models/User');

router.get('/workouts', async (req, res) => {
  //use a random user in the database for now
  // const _id = '625763d1974d42cfce0fa342';
  console.log('Got to /workouts. Printing res');
  console.log(res.body);
  const user = await User.findById(req.params._id);
  console.log('User.workouts assign');
  // const workouts = user.workouts;
  console.log('user workouts data');
  console.log(user);
  try {
    res.json({
      success: true,
      workouts: user.workouts,
      status: 'retrieving workouts from database succeeded',
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: 'retrieving workouts from database failed',
    });
  }
});

module.exports = router;
