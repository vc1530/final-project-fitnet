/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(express.json());
router.use(bodyParser.urlencoded());
// router.use(express.urlencoded({ extended: true }));
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const { Exercise } = require('../models/Workout');
const { User } = require('../models/User');
// const { check } = require('prettier');

router.get('/w/:uid/:id', async (req, res) => {
  try {
    console.log(`handling get workout ${req.params.id}`);
    console.log(`printing req.params.uid: ${req.params.uid}`);
    const user = await User.findById(req.params.uid);
    // console.log("Printing user workouts")
    // console.log(user.workouts)
    const workout = user.workouts.find((w) => w._id == req.params.id);
    if (!workout) {
      console.log(`get workout failed: workout ${req.params.id} was not found`);
      res.status(400).json({
        success: false,
        status: `workout ${req.params.id} was not found`,
      });
    } else {
      console.log('get workout: workout is valid');
      res.json({
        success: true,
        workout: {
          workout_name: workout.workout_name,
          workout_description: workout.workout_description,
          playlist: workout.playlist,
          id: workout._id,
          exercises: workout.exercises,
        },
        status: `retrieving workout ${req.params.id} succeeded`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: `retrieving workout ${req.params.id} failed`,
    });
  }
});

router.post('/w/:id', async (req, res) => {
  try {
    const user = await User.findById(req.body.uid);
    if (req.params.id == 'new') {
      const workout = {
        _id: Date.now(),
        workout_name: 'New Workout',
        workout_description: 'Description',
        exercises: [],
        playlist: '',
      };
      user.workouts.unshift(workout);
      await user.save();
      res.json({
        success: true,
        workouts: user.workouts,
        workout, // If code breaks get rid of this and deal with unit tests later
        status: `added workout ${workout.id} to database`,
      });
    } else {
      const workout = user.workouts.find((w) => w._id == req.params.id);
      if (!workout) {
        res.status(400).json({
          success: false,
          status: `workout ${req.params.id} was not found`,
        });
      } else {
        workout.workout_name = req.body.workout_name;
        workout.workout_description = req.body.workout_description;
        const index = user.workouts.indexOf(user.workouts.find((w) => w._id == req.params.id));
        user.workouts[index] = workout;
        await user.save();

        res.json({
          success: true,
          workout: workout,
          status: `editing workout ${req.params.id} succeeded`,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: `editing workout ${req.params.id} failed`,
    });
  }
});

const compare_exercise_data = (e1, e2) =>
  e1 &&
  e2 &&
  e1.index == e2.index &&
  e1.exercise_name == e2.exercise_name &&
  e1.num_sets == e2.num_sets &&
  e1.num_reps == e2.num_reps;

router.post('/we/:id/:index', async (req, res) => {
  // console.log('handling add exercise');
  // console.log(req.params);
  try {
    console.log(`edit exercise: finding user ${req.body.uid}`);
    const user = await User.findById(req.body.uid);
    // console.log('edit exercise: printing user');
    // console.log(user);
    const workout = user.workouts.find((w) => w._id == req.params.id);
    if (!workout) {
      console.log(`edit exercise failed: workout ${req.params.id} was not found`);
      res.status(400).json({
        success: false,
        status: `workout ${req.params.id} was not found`,
      });
    } else {
      // Workout is valid
      // console.log('edit exercise: workout is valid');
      const exercises = workout.exercises;
      if (!exercises) {
        console.log(
          `edit exercise failed: could not find exercises array in workout ${workout._id}`
        );
        res.status(400).json({
          success: false,
          status: `could not find exercises array in workout ${workout._id}`,
        });
      } else {
        // Exercises array is valid
        console.log('edit exercise: exercise array is valid');
        const workoutIndex = user.workouts.findIndex((w) => w._id == req.params.id);
        if (!workout.exercises.find((exercise) => exercise.index == req.params.index)) {
          // Add exercise
          console.log('handling add exercise');
          console.log('req.body: ');
          console.log(req.body);
          const updatedWorkout = user.workouts[workoutIndex];
          const newExercise = await Exercise.create({
            index: req.body.exercise.index,
            exercise_name: req.body.exercise.name,
            num_sets: req.body.exercise.sets,
            num_reps: req.body.exercise.reps,
          });
          console.log(newExercise);
          updatedWorkout.exercises = [...exercises, newExercise];
          // let updatedExercises = [...exercises, req.body];
          // console.log('updatedExercises: ');
          // console.log(updatedExercises);
          user.workouts[workoutIndex] = updatedWorkout;
          await user.save();
          // console.log(user.workouts)
          // console.log('user.workouts[workoutIndex].exercises after save:');
          // console.log(user.workouts[workoutIndex].exercises);
          const check_user = await User.findById(req.body.uid);
          // console.log('check_user.workouts[workoutIndex]:');
          // console.log(check_user.workouts[workoutIndex]);
          // console.log('check_user exercises:');
          // console.log(check_user.workouts[workoutIndex].exercises);
          const check_exercise = check_user.workouts[workoutIndex].exercises[exercises.length];
          // console.log(user.workouts);
          // console.log('check_exercise: ');
          // console.log(check_exercise);
          // console.log('req.body.exercise');
          // console.log(req.body.exercise);
          console.log('compare_exercise_data');
          console.log(compare_exercise_data(check_exercise, newExercise));
          if (!compare_exercise_data(check_exercise, newExercise)) {
            console.log(`Failed to add exercise to workout ${req.params.id}`);
            res.json({
              success: false,
              status: `exercise ${req.params.index} didnt add properly to workout ${req.params.id}`,
            });
          } else {
            console.log(
              `exercise ${workout.exercises.length} was successfully added to workout ${req.params.id}`
            );
            res.json({
              success: true,
              status: `exercise ${req.params.index} added to workout ${req.params.id}`,
              exercises: user.workouts[workoutIndex].exercises,
            });
          }
        } else {
          console.log('handling edit exercise');
          const updatedWorkout = user.workouts[workoutIndex];
          const exerciseIndex = updatedWorkout.exercises.findIndex(
            (exercise) => exercise.index == req.body.index
          );
          updatedWorkout.exercises[exerciseIndex] = req.body;
          // console.log('user.workout: ');
          // console.log(user.workouts[workoutIndex]);
          // console.log('updated workout:');
          // console.log(updatedWorkout);
          user.workouts[workoutIndex] = updatedWorkout;
          await user.save();
          const check_user = await User.findById(req.body.uid);
          const check_exercise = check_user.workouts[workoutIndex].exercises[exerciseIndex];
          // let input = req.body;
          // console.log('check_exercise');
          // console.log(check_exercise);
          // console.log('input');
          // console.log(input);
          // console.log(check_exercise == req.body);
          // console.log('index, name, sets, reps: bools');
          // console.log(check_exercise.exercise_name == input.exercise_name);
          // console.log(check_exercise.exercise_name == input.exercise_name);
          // console.log(check_exercise.num_sets == input.num_sets);
          // console.log(check_exercise.num_reps == input.num_reps);
          // const check_exercise_data =
          //   check_exercise.index == input.index &&
          //   check_exercise.exercise_name == input.exercise_name &&
          //   check_exercise.num_sets == input.num_sets &&
          //   check_exercise.num_reps == input.num_reps;
          // console.log('check_exercise_data');
          // console.log(check_exercise_data);
          if (!compare_exercise_data(check_exercise, req.body)) {
            console.log(
              `editing exercise ${req.params.index} of workout ${req.params.id} failed: database did not udpate`
            );
          } else {
            console.log(
              `editing exercise ${req.params.index} of workout ${req.params.id} successful`
            );
            res.json({
              success: true,
              status: `editing exercise ${req.params.index} of workout ${req.params.id}successful`,
              exercises: user.workouts[workoutIndex].exercises,
            });
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: `editing exercise ${req.params.index} of workout ${req.params.id}failed`,
    });
  }
});

router.delete('/w/:uid/:id', async (req, res) => {
  try {
    console.log(`req.params.uid: ${req.params.uid}`);
    const user = await User.findById(req.params.uid);
    const workout = user.workouts.find((w) => w._id == req.params.id);
    if (!workout) {
      console.log(`Failed to delete workout: workout ${req.params.id} not found`);
      res.status(400).json({
        success: false,
        status: `Unable to find workout ${req.params.id} for deletion`,
      });
    } else {
      console.log(`Deleting workout ${workout._id}`);
      // console.log(user.workouts);
      const updatedWorkouts = user.workouts.filter((w) => w._id != req.params.id);
      user.workouts = updatedWorkouts;
      await user.save();
      const check_user = await User.findById(req.params.uid);
      // console.log('check_user workouts: ');
      // console.log(check_user.workouts);
      const check_workout = check_user.workouts.find((w) => w._id == req.params.id);
      // console.log('Checking filter: ');
      // console.log(check_workout);

      if (check_workout) {
        console.log(`Failed to delete workout: workout ${req.params.id} not deleted`);
        res.status(400).json({
          success: false,
          status: `Failed to delete workout ${req.params.id}`,
        });
      } else {
        console.log(`Successfully deleted workout ${req.params.id}`);
        res.json({
          success: true,
          status: `successfully deleted workout ${req.params.id}`,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: `deleting workout ${req.params.id}failed`,
    });
  }
});

// Delete exercise
router.delete('/we/:uid/:id/:index', async (req, res) => {
  console.log('handling delete exercise');
  try {
    console.log(req.params);
    const user = await User.findById(req.params.uid);

    const workout = user.workouts.find((w) => w._id == req.params.id);
    // console.log('Printing workout');
    // console.log(workout);
    if (!workout) {
      console.log(`delete exercise failed: workout ${req.params.id} was not found`);
      res.status(400).json({
        success: false,
        status: `workout ${req.params.id} was not found`,
      });
    } else {
      // Workout is valid
      console.log('delete exercise: workout is valid');
      const workoutIndex = user.workouts.findIndex((w) => w._id == req.params.id);
      const exercises = workout.exercises;
      if (!exercises) {
        console.log(
          `delete exercise failed: could not find exercises array in workout ${workout._id}`
        );
        res.status(400).json({
          success: false,
          status: `could not find exercises array in workout ${workout._id}`,
        });
      } else {
        // Exercises array is valid
        const updatedExercises = exercises.slice(0, exercises.length - 1);
        console.log(
          `exercises.length: ${exercises.length}\tupdatedExercises.length: ${updatedExercises.length}`
        );
        console.log(updatedExercises);
        const updatedWorkout = user.workouts[workoutIndex];
        updatedWorkout.exercises = updatedExercises;
        user.workouts[workoutIndex] = updatedWorkout;
        console.log(
          `user.workouts[workoutIndex].exercises.length: ${user.workouts[workoutIndex].exercises.length}`
        );
        await user.save();
        console.log(
          `user.workouts[workoutIndex].exercises.length after save: ${user.workouts[workoutIndex].exercises.length}`
        );
        const check_user = await User.findById(req.params.uid);
        const check_exercise = check_user.workouts[workoutIndex].exercises.find(
          (exercise) => exercise.index > updatedExercises.length
        );
        console.log('delete exercise DB update:');
        console.log(check_exercise);
        if (check_exercise) {
          console.log('delete exercise failed: database did not update');
        }
        console.log(
          `exercise ${workout.exercises.length} was successfully removed from workout ${req.params.id}`
        );
        res.json({
          success: true,
          status: `exercise ${workout.exercises.length} was successfully removed`,
          exercises: user.workouts[workoutIndex].exercises,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: `deleting workout ${req.params.id}failed`,
    });
  }
});

module.exports = router;
