import "./WorkoutHistory.css"
import {Link} from "react-router-dom"
import workout_database from "./mock_workouts.json" 
import WorkoutPost from "./WorkoutPost"

const WorkoutHistory = () => {

    let posts = workout_database;
    return(
        <main className="WorkoutHistory">
            <header className = "Feed-header">
                <h1><a href = "/WorkoutHistory" >Workout History</a></h1>
            </header>

            <body className = "Workout-posts">
                {posts.map((workout) => ( 
                <WorkoutPost 
                    name = {workout.workout_name} 
                    description = {workout.workout_description}
                /> 
                )) 
                }   
            </body>
            <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "#">Create a new post</a>
                    <a href="/Feed">Feed</a>
                    <b><a href="/MyProfile">My Profile</a></b>
                    <a href="/Settings">Settings</a>
                </nav>
            </footer>
        </main>
    )
}

export default WorkoutHistory