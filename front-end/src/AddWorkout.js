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
    const dummy2 = dummyExercise("Pullups", 3, 15)
    const dummy3 = dummyExercise("Squats", 3, 15)

    return (
        <main className="AddWorkout">
            <Header
                url = "./addWorkout" 
                title = "Add Workout"
            /> 
            <AddWorkoutInfo/>

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
            <p>
                <Link to='/addExercise'>Add Exercise</Link>
            </p>

        </main>
        
        
    )
}

export default AddWorkout