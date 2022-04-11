import "./AddWorkout.css"
import AddWorkoutInfo from "./AddWorkoutInfo.js"
import Exercise from "./Exercise.js"
import Header from "./Header"
import Footer from "./Footer"
import { useState, useEffect } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useParams } from "react-router-dom";
import axios from "axios"
import { HiOutlineMusicNote } from 'react-icons/hi' 

const AddWorkout = () => {
    const dummyExercise = (exercise_name, num_sets, num_reps, index_value) => {
        const name = exercise_name
        const sets = num_sets
        const reps = num_reps
        const index = index_value
        return {name, sets, reps, index}
    }

    // const dummy1 = dummyExercise("Pushups", 3, 15)
    // const dummy2 = dummyExercise("Pullups", 3, 15)
    // const dummy3 = dummyExercise("Squats", 3, 15)

    const [workout_name, setName] = useState("") 
    const [workout_description, setDesc] = useState("")
    const [exercises, setExercises] = useState([]) 

    let params = useParams(); 

    useEffect(() => { 
        if(params.id === 'new') {
            console.log("New workout, no retrieval")
            console.log("This should say 'new': " + params.id)
        }
        else{
            console.log("retrieving workout " + params.id) 
            axios 
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + params.id) 
            .then(res => { 
                setName(res.data.workout.workout_name)
                setDesc(res.data.workout.workout_description) 
                setExercises(res.data.workout.exercises)
                console.log("successful retrieval of workout " + params.id + " from database")
            })
            .catch(err => { 
                console.log("retrieval of workout " + params.id + " from backend failed") 
                console.log(err)
            })
        }
    }, [params.id]) 

    function addExercise() {
        console.log("Starting addExercise function")
        alert('You clicked me!');
        let filler = dummyExercise("", "", "", exercises.length + 1)
        console.log(filler)
        exercises.append(filler)
    }

    return (
        <main className="AddWorkout">
            <Header
                url = "./addWorkout" 
                title = "Add Workout"
            /> 
            <div className="backlink">
                <a className = "User-link" href={"../workoutHistory"}>{<BsArrowLeftCircle size = "30px"/>}</a>
                <div>
                        <a id = "playlistLink" 
                            className = "User-link"
                            href = {'../p/' + params.id} >
                            {<HiOutlineMusicNote size = "30px"/>}
                        </a> 
                    <a className = "User-link" href={"../e/" + params.id}>{<AiOutlinePlusCircle size = "34px"/>}</a>
                </div>
            </div>
            <AddWorkoutInfo
                workout_name = {workout_name} 
                workout_description = {workout_description} 
                id = {params.id}
            />

            <h5 className="TableHeader">
                <div>Exercise Name</div>
                <div>Sets</div>
                <div>Reps</div>
            </h5>
            
            <div>
                {exercises?.map((exercise, index) => ( 
                <Exercise  
                    id = {params.id}
                    index = {index}
                    exercise_name = {exercise.exercise_name} 
                    num_sets = {exercise.num_sets}
                    num_reps = {exercise.num_reps}
                /> 
                )) 
                }   
            </div>
            <button onclick={addExercise}>
                {<AiOutlinePlusCircle size = "30px"/>}
                {/* <div>{<AiOutlinePlusCircle size = "30px"/>}</div> */}
            </button>
            {/* <div className="AddExercise">
                <a className = "User-link" href={"../workoutHistory"}>{<BsArrowLeftCircle size = "30px"/>}</a>
            </div> */}
            <Footer
            />
            {/* <p>
                <Link to='/addExercise'>Add Exercise</Link>
            </p> */}

        </main>
        
        
    )
}

export default AddWorkout