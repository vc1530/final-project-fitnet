import "./WorkoutHistory.css"
import workout_database from "./mock_workouts.json" 
import WorkoutPost from "./WorkoutPost"
import Header from "./Header"
import Footer from "./Footer" 


const WorkoutHistory = () => {

    let posts = workout_database;
    return(
        <main className="WorkoutHistory">
            <Header 
                url = "./WorkoutHistory" 
                title = "Workout History"
            /> 
            <body className = "Workout-posts">
                {posts.map((workout) => ( 
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