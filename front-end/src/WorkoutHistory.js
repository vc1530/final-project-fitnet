import './WorkoutHistory.css';
import WorkoutPost from './WorkoutPost';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const WorkoutHistory = () => {
  const jwtToken = localStorage.getItem('token');

<<<<<<< HEAD
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [workouts, setWorkouts] = useState([]);
  const [newWorkoutRoute, setNewWorkoutRoute] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      .then((res) => {
        setWorkouts(res.data.user.workouts);
      })
      .catch((err) => {
        console.error(err);
        console.log('Invalid token');
        setIsLoggedIn(false);
      });
  }, [jwtToken]);

  // useEffect (() => {
  //     console.log('retrieving workouts from database')
  //     setNewWorkoutRoute('/w/new')
  //     axios
  //         .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/workouts`)
  //         .then(res => {
  //             setWorkouts(res.data.workouts)
  //             console.log("successful retrieval of workouts from database")
  //         })
  //         .catch(err => {
  //             console.log("retrieval of workouts from backend failed")
  //             console.error(err)
  //         })
  //     }, [])

  const addWorkout = () => {
    console.log('WorkoutHistory.js: addWorkout function begin');
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/new`)
      .then((res) => {
        // Update list of workouts
        setWorkouts(res.data.workouts);
        setNewWorkoutRoute('/w/' + res.data.workouts[0]._id);
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
          <a className="User-link" href={'../myProfile'}>
            {<BsArrowLeftCircle size="30px" />}
          </a>
          <Link to={addWorkout} href={newWorkoutRoute}>
            <a href={newWorkoutRoute}>
              <AiOutlinePlusCircle size="34px" />
            </a>
          </Link>
        </div>
        <body className="Workout-posts">
          {workouts?.map((workout) => (
            <WorkoutPost
              name={workout.workout_name}
              description={workout.workout_description}
              id={workout._id}
              playlist={workout.playlist}
=======
    //default user until we finish login 
    const _id = "62570c4071b5c02be1b2d71d"

    const [workouts, setWorkouts] = useState([])
    // const [newWorkoutRoute, setNewWorkoutRoute] = useState([])

    const refreshWorkouts = () => {
        console.log("refreshing workout history")
        axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/workouts`, {id: _id})
        .then(res => {
            setWorkouts(res.data.workouts)
            console.log("Successfuly refreshed workout history")
        })
        .catch(err => {
            console.log("Failed to refresh workout history")
            console.error(err)
        })
    }
    useEffect (() => { 
        console.log('retrieving workouts from database')
        //setNewWorkoutRoute('/w/new')
        axios 
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/workouts`, _id) 
            .then(res => { 
                setWorkouts(res.data.workouts) 
                console.log("successful retrieval of workouts from database")
            })
            .catch(err => { 
                console.log("retrieval of workouts from backend failed") 
                console.error(err)
            })
        }, [])
        
    const addWorkout = () => {
        console.log("WorkoutHistory.js: addWorkout function begin")
        axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/new`)
        .then((res) => {
            // Update list of workouts
            // setWorkouts(res.data.workouts)
            // setNewWorkoutRoute('/w/' + res.data.workouts[0]._id)
            refreshWorkouts()
        })
        .catch(err => {
            console.log("WorkoutHistory.js: couldn't add a new workout")
            console.error(err)
        })
    }
    return(
        <main className="WorkoutHistory">
            <Header 
                url = "./WorkoutHistory" 
                title = "Workout History"
            /> 
            {//Add workout button goes here
            }
            <div className="backlink">
                <a className = "User-link" href={"../myProfile"}>{<BsArrowLeftCircle size = "30px"/>}</a>
                {/* <a 
                    className = "User-link" 
                    onClick={addWorkout}
                    href={'./workoutHistory'}>{<AiOutlinePlusCircle size = "34px"/>}
                </a> */}
                <button className="newWorkoutButton" type='button' onClick={addWorkout}>
                    <AiOutlinePlusCircle size = "30px"/>
                </button>
            </div>
            <body className = "Workout-posts">
                {workouts?.map((workout) => ( 
                <WorkoutPost 
                    name = {workout.workout_name} 
                    description = {workout.workout_description}
                    id = {workout._id}
                    playlist = {workout.playlist}
                /> 
                )) 
                }   
            </body>
            <Footer 
                title = "Workout History" 
>>>>>>> f7c773d (saving changes)
            />
          ))}
        </body>
        <Footer title="Workout History" />
      </main>
    );
  else return <Navigate to="/login?error=protected" />;
};

export default WorkoutHistory;
