const express = require('express');
const router = express.Router();
const allWorkouts = require('../mock_workouts.json');

const { Workout } = require('../models/Workout');
const { User } = require('../models/User');
// const { check } = require('prettier');

router.get('/w/:id', async (req, res) => {
  try {
    console.log('handling get workout ' + req.params.id);
    //use a random user in the database for now
    const _id = '625763d1974d42cfce0fa342';
    let user = await User.findById(_id);
    const workout = user.workouts.find((workout) => workout._id == req.params.id);
    if (!workout) {
      console.log('get workout failed: workout ' + req.params.id + ' was not found');
      res.status(400).json({
        success: false,
        status: 'workout ' + req.params.id + ' was not found',
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
        status: 'retrieving workout ' + req.params.id + ' succeeded',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: 'retreiving workout ' + req.params.id + ' failed',
    });
  }
});

router.post('/w/:id', async (req, res) => {
  try {
    const user = await User.findById(req.body.uid);
    if (req.params.id == 'new') {
      const workout = await Workout.create({
        workout_name: 'New Workout', // req.body.workout_name,
        workout_description: 'Description', // req.body.workout_description
      });
      user.workouts.unshift(workout);
      await user.save();
      res.json({
        success: true,
        workouts: user.workouts,
        status: 'added workout ' + workout.id + 'to database',
      });
    } else {
      const workout = await Workout.findById(req.params.id);
      if (!workout) {
        res.status(400).json({
          success: false,
          status: 'workout ' + req.params.id + ' was not found',
        });
      } else {
        workout.workout_name = req.body.workout_name;
        workout.workout_description = req.body.workout_description;
        await workout.save();

        const index = user.workouts.indexOf(
          user.workouts.find((workout) => workout._id == req.params.id)
        );
        user.workouts[index] = workout;
        await user.save();

        res.json({
          success: true,
          workout: workout,
          status: 'editing workout ' + req.params.id + ' succeeded',
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: 'editing workout ' + req.params.id + ' failed',
    });
  }
});

const compare_exercise_data = (e1, e2) => {
  return (
    e1 &&
    e2 &&
    e1.index == e2.index &&
    e1.exercise_name == e2.exercise_name &&
    e1.num_sets == e2.num_sets &&
    e1.num_reps == e2.num_reps
  );
};

router.post('/we/:id/:index', async (req, res) => {
  console.log('handling add exercise');
  console.log(req.params);
  try {
    //use a random user in the database for now
    const _id = '625763d1974d42cfce0fa342';
    let user = await User.findById(_id);

    const workout = user.workouts.find((workout) => workout._id == req.params.id);
    if (!workout) {
      console.log('edit exercise failed: workout ' + req.params.id + 'was not found');
      res.status(400).json({
        success: false,
        status: 'workout ' + req.params.id + 'was not found',
      });
    } else {
      //Workout is valid
      console.log('edit exercise: workout is valid');
      const exercises = workout.exercises;
      if (!exercises) {
        console.log(
          'edit exercise failed: could not find exercises array in workout ' + workout._id
        );
        res.status(400).json({
          success: false,
          status: 'could not find exercises array in workout' + workout._id,
        });
      } else {
        //Exercises array is valid
        console.log('edit exercise: exercise array is valid');
        const workoutIndex = user.workouts.findIndex((workout) => workout._id == req.params.id);
        // if (req.params.index == -1) {
        //   console.log('handling exercise deletion');
        //   let updatedExercises = exercises.slice(1, exercises.length);
        //   user.workouts[workoutIndex].exercises = updatedExercises;
        //   await user.save();
        //   let check_user = await User.findById(_id);
        //   let check_exercise = check_user.workouts[workoutIndex].exercises.find((exercise) =>
        //     compare_exercise_data(exercise, req.body)
        //   );
        //   console.log('delete exercise DB update:');
        //   console.log(check_exercise);
        //   if (check_exercise) {
        //     console.log('delete exercise failed: database did not update');
        //   }
        //   console.log(
        //     'exercise ' +
        //       workout.exercises.length +
        //       ' was successfully removed from workout ' +
        //       req.params.id
        //   );
        //   res.json({
        //     success: true,
        //     status: 'exercise ' + workout.exercises.length + ' was successfully removed',
        //     exercises: user.workouts[workoutIndex].exercises,
        //   });
        // } else
        if (!workout.exercises.find((exercise) => exercise.index == req.params.index)) {
          console.log('handling add exercise');
          console.log('req.body: ');
          console.log(req.body);
          let updatedWorkout = user.workouts[workoutIndex];
          updatedWorkout.exercises = [...exercises, req.body];
          // let updatedExercises = [...exercises, req.body];
          // console.log('updatedExercises: ');
          // console.log(updatedExercises);
          user.workouts[workoutIndex] = updatedWorkout;
          await user.save();
          // console.log('user.workouts[workoutIndex].exercises after save:');
          // console.log(user.workouts[workoutIndex].exercises);
          let check_user = await User.findById(_id);
          // console.log('check_user.workouts[workoutIndex]:');
          // console.log(check_user.workouts[workoutIndex]);
          // console.log('check_user exercises:');
          // console.log(check_user.workouts[workoutIndex].exercises);
          let check_exercise = check_user.workouts[workoutIndex].exercises[exercises.length];
          console.log('check_exercise: ');
          console.log(check_exercise);
          console.log('req.body');
          console.log(req.body);
          console.log('compare_exercise_data');
          console.log(compare_exercise_data(check_exercise, req.body));
          if (!compare_exercise_data(check_exercise, req.body)) {
            console.log('Failed to add exercise to workout ' + req.params.id);
            res.json({
              success: false,
              status:
                'exercise ' + req.params.index + ' didnt add properly to workout ' + req.params.id,
            });
          } else {
            console.log(
              'exercise ' +
                workout.exercises.length +
                ' was successfully added to workout ' +
                req.params.id
            );
            res.json({
              success: true,
              status: 'exercise ' + req.params.index + ' added to workout ' + req.params.id,
              exercises: user.workouts[workoutIndex].exercises,
            });
          }
        } else {
          console.log('handling edit exercise');
          let updatedWorkout = user.workouts[workoutIndex];
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
          let check_user = await User.findById(_id);
          let check_exercise = check_user.workouts[workoutIndex].exercises[exerciseIndex];
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
              'editing exercise ' +
                req.params.index +
                ' of workout ' +
                req.params.id +
                ' failed: database did not udpate'
            );
          } else {
            console.log(
              'editing exercise ' +
                req.params.index +
                ' of workout ' +
                req.params.id +
                ' successful'
            );
            res.json({
              success: true,
              status:
                'editing exercise ' +
                req.params.index +
                ' of workout ' +
                req.params.id +
                'successful',
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
      status: 'editing exercise ' + req.params.index + ' of workout ' + req.params.id + 'failed',
    });
  }
});

router.delete('/w/:id', async (req, res) => {
  try {
    //use a random user in the database for now
    const _id = '625763d1974d42cfce0fa342';
    let user = await User.findById(_id);
    const workout = user.workouts.find((workout) => workout._id == req.params.id);
    if (!workout) {
      console.log('Failed to delete workout: workout ' + req.params.id + 'not found');
      res.status(400).json({
        success: false,
        status: 'Unable to find workout ' + req.params.id + ' for deletion',
      });
    } else {
      console.log('Deleting workout ' + workout._id);
      // console.log(user.workouts);
      let updatedWorkouts = user.workouts.filter((workout) => workout._id != req.params.id);
      user.workouts = updatedWorkouts;
      await user.save();
      let check_user = await User.findById(_id);
      // console.log('check_user workouts: ');
      // console.log(check_user.workouts);
      let check_workout = check_user.workouts.find((workout) => workout._id == req.params.id);
      // console.log('Checking filter: ');
      // console.log(check_workout);

      if (check_workout) {
        console.log('Failed to delete workout: workout ' + req.params.id + ' not deleted');
        res.status(400).json({
          success: false,
          status: 'Failed to delete workout ' + req.params.id,
        });
      } else {
        console.log('Successfully deleted workout ' + req.params.id);
        res.json({
          success: true,
          status: 'successfully deleted workout' + req.params.id,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: 'deleting workout ' + req.params.id + 'failed',
    });
  }
});

router.delete('/we/:id/:index', async (req, res) => {
  console.log('handling delete exercise');
  try {
    console.log(req.params);
    const _id = '625763d1974d42cfce0fa342';
    let user = await User.findById(_id);

    const workout = user.workouts.find((workout) => workout._id == req.params.id);
    if (!workout) {
      console.log('delete exercise failed: workout ' + req.params.id + 'was not found');
      res.status(400).json({
        success: false,
        status: 'workout ' + req.params.id + 'was not found',
      });
    } else {
      //Workout is valid
      console.log('delete exercise: workout is valid');
      const exercises = workout.exercises;
      if (!exercises) {
        console.log(
          'delete exercise failed: could not find exercises array in workout ' + workout._id
        );
        res.status(400).json({
          success: false,
          status: 'could not find exercises array in workout' + workout._id,
        });
      } else {
        //Exercises array is valid
        const workoutIndex = user.workouts.findIndex((workout) => workout._id == req.params.id);
        let updatedExercises = exercises.slice(1, exercises.length);
        user.workouts[workoutIndex].exercises = updatedExercises;
        await user.save();
        let check_user = await User.findById(_id);
        let check_exercise = check_user.workouts[workoutIndex].exercises.find((exercise) =>
          compare_exercise_data(exercise, req.body)
        );
        console.log('delete exercise DB update:');
        console.log(check_exercise);
        if (check_exercise) {
          console.log('delete exercise failed: database did not update');
        }
        console.log(
          'exercise ' +
            workout.exercises.length +
            ' was successfully removed from workout ' +
            req.params.id
        );
        res.json({
          success: true,
          status: 'exercise ' + workout.exercises.length + ' was successfully removed',
          exercises: user.workouts[workoutIndex].exercises,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err,
      status: 'deleting workout ' + req.params.id + 'failed',
    });
  }
});

module.exports = router;
