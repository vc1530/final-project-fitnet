import "./AddWorkout.css"
import AddWorkoutInfo from "./AddWorkoutInfo.js"
import Exercise from "./Exercise.js"
import Header from "./Header"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'

const AddWorkout = () => {
    const [exercises, setExercises] = useState([])
    const dummyExercise = (exerciseName, numSets, numReps) => {
        const name = exerciseName
        const sets = numSets
        const reps = numReps
        return {name, sets, reps}
    }

    const dummy1 = dummyExercise("Pushups", 3, 15)

    return (
        <main className="AddWorkout">
            <Header
                url = "./addWorkout" 
                title = "Add Workout"
            /> 
            <AddWorkoutInfo/>

            <Exercise
                exerciseName={dummy1.name}
                numSets={dummy1.sets}
                numReps={dummy1.reps}
            />
            <Footer
            />
            <p>
                <Link to='/addExercise'>Add Exercise</Link>
            </p>

        </main>
        
        
    )
}

export default AddWorkout