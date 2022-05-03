import './WorkoutHistory.css';
import WorkoutPost from './WorkoutPost';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const WorkoutHistory = () => {
  const jwtToken = localStorage.getItem('token');
  const [uid, setUid] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      .then((res) => {
        setWorkouts(res.data.user.workouts);
        setUid(res.data.user._id);
      })
      .catch((err) => {
        console.error(err);
        console.log('Invalid token');
        setIsLoggedIn(false);
      });
  }, [uid, jwtToken]);

  const addWorkout = () => {
    console.log('WorkoutHistory.js: addWorkout function begin');
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/new`, { uid: uid })
      .then((res) => {
        // Update list of workouts
        setWorkouts(res.data.workouts);
        window.location.href = `/w/${res.data.workouts[0]._id}`;
      })
      .catch((err) => {
        console.log("WorkoutHistory.js: couldn't add a new workout");
        console.error(err);
      });
  };

  if (isLoggedIn)
    return (
      <main className="WorkoutHistory">
        <Header url="./WorkoutHistory" title="Workout History" />
        <div className="backlink">
          <Link className="User-link" to={'../myProfile'}>
            {<BsArrowLeftCircle size="30px" />}
          </Link>
          <button className="newWorkoutButton" onClick={addWorkout}>
            <AiOutlinePlusCircle size="34px" />
          </button>
        </div>
        <body className="Workout-posts">
          {workouts?.map((workout) => (
            <WorkoutPost
              name={workout.workout_name}
              description={workout.workout_description}
              id={workout._id}
              playlist={workout.playlist}
            />
          ))}
        </body>
        <Footer title="Workout History" />
      </main>
    );
  else return <Navigate to="/login?error=protected" />;
};

export default WorkoutHistory;
