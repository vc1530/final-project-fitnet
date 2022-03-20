import "./Home.css"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <main>
            <p>
                Testing routing. <Link to='/addExercise'>add exercise</Link>, <Link to='/addWorkout'>add workout</Link>, 
                                     <Link to='/myProfile'>My Profile</Link>, <Link to='workoutHistory'>Workout History</Link>,
                                     <Link to = '/NewPost'>Create a new post</Link>.
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