import "./WorkoutHistory.css"
//import workout_database from "./mock_workouts.json" 
import WorkoutPost from "./WorkoutPost"
import Header from "./Header"
import Footer from "./Footer" 
import { useState, useEffect} from 'react'
import axios from "axios"

const WorkoutHistory = () => {

    const [workouts, setWorkouts] = useState([])

    useEffect (() => { 
        console.log('retrieving workouts from database')
        axios 
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/workouts`) 
            .then(res => { 
                setWorkouts(res.data.workouts) 
                console.log("successful retrieval of workouts from database")
            })
            .catch(err => { 
                console.log("retrieval of workouts from backend failed") 
                console.log(err)
            })
        }, [])

    //let posts = workout_database;
    return(
        <main className="WorkoutHistory">
            <Header 
                url = "./WorkoutHistory" 
                title = "Workout History"
            /> 
            <body className = "Workout-posts">
                {workouts.map((workout) => ( 
                <WorkoutPost 
                    picture = {workout.picture} 
                    name = {workout.workout_name} 
                    description = {workout.workout_description}
                    id = {workout.id}
                /> 
                )) 
                }   
            </body>
            <Footer 
                title = "Workout History" 
            />
        </main>
    )
}

export default WorkoutHistory