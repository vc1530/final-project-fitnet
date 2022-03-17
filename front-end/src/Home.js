import "./Home.css"
import { Link } from "react-router-dom"

const Home = () => {
    return ( 
        <main>
            <p>
                Testing routing. <Link to='/addExercise'>add exercise</Link>, <Link to='/addWorkout'>add workout</Link>
                                <Link to='/MyProfile'>My Profile</Link>, <Link to='/WorkoutHistory'>Workout History</Link>.
            </p>
            <p>
                This should link to this page: <Link to='/'>home</Link>.
            </p>

            <p> 
                Hi guys I am in the process of creating the feed and populating it with dummy posts and profiles. 
                This should link to the <Link to ="/Feed" > Feed</Link>.
                -Vanessa 
            </p>

        </main>
    )
}

export default Home