import "./AddWorkout.css"
import AddWorkoutInfo from "./AddWorkoutInfo.js"
import Header from "./Header"
import Footer from "./Footer"

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
        
        </main>
        
        
    )
}

export default AddWorkout