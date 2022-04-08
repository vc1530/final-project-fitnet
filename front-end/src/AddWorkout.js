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

const AddWorkout = () => {
    const dummyExercise = (exerciseName, numSets, numReps) => {
        const name = exerciseName
        const sets = numSets
        const reps = numReps
        return {name, sets, reps}
    }

    const dummy1 = dummyExercise("Pushups", 3, 15)
    const dummy2 = dummyExercise("Pullups", 3, 15)
    const dummy3 = dummyExercise("Squats", 3, 15)

    const [workout_name, setName] = useState("") 
    const [workout_description, setDesc] = useState("") 

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
                console.log("successful retrieval of workout " + params.id + " from database")
            })
            .catch(err => { 
                console.log("retrieval of workout " + params.id + " from backend failed") 
                console.log(err)
            })
        }
    }, [params.id]) 

    return (
        <main className="AddWorkout">
            <Header
                url = "./addWorkout" 
                title = "Add Workout"
            /> 
            <div className="backlink">
                <a href={"../workoutHistory"}>{<BsArrowLeftCircle size = "30px"/>}</a>
                <a href={"../e/" + params.id}>{<AiOutlinePlusCircle size = "34px"/>}</a>
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
            <Exercise
                exerciseName={dummy1.name}
                numSets={dummy1.sets}
                numReps={dummy1.reps}
            />
            <Exercise
                exerciseName={dummy2.name}
                numSets={dummy2.sets}
                numReps={dummy2.reps}
            />
            <Exercise
                exerciseName={dummy3.name}
                numSets={dummy3.sets}
                numReps={dummy3.reps}
            />
            <Footer
            />
            {/* <p>
                <Link to='/addExercise'>Add Exercise</Link>
            </p> */}

        </main>
        
        
    )
}

export default AddWorkout