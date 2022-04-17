import "./WorkoutHistory.css"
import WorkoutPost from "./WorkoutPost"
import Header from "./Header"
import Footer from "./Footer" 
import { useState, useEffect} from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from "axios"
import { Navigate } from "react-router-dom"

const WorkoutHistory = () => {

    const jwtToken = localStorage.getItem("token") 

    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) 

    const [workouts, setWorkouts] = useState([])

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, { 
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        .then(res => { 
            setWorkouts(res.data.user.workouts) 
        })
        .catch(err => { 
            console.error(err) 
            console.log("Invalid token") 
            setIsLoggedIn(false) 
        })
    }, [])
        
    if (isLoggedIn) 
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
                    <a className = "User-link" href={"../w/new"}>{<AiOutlinePlusCircle size = "34px"/>}</a>
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
                />
            </main>
        )
    else return <Navigate to ="/login?error=protected" /> 
}

export default WorkoutHistory