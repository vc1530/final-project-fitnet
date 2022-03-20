import "./AddWorkout.css"
import AddWorkoutInfo from "./AddWorkoutInfo.js"
import Header from "./Header"
import Footer from "./Footer"
import { Link } from "react-router-dom"

const AddWorkout = () => {
    return (
        <main className="AddWorkout">
            <Header
                url = "./addWorkout" 
                title = "Add Workout"
            /> 
            <AddWorkoutInfo/>

            <Footer
                title = "AddWorkout"
            />
            <p>
                <Link to='/addExercise'>Add Exercise</Link>
            </p>
        </main>
        
        
    )
}

export default AddWorkout