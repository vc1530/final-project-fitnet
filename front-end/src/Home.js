import "./Home.css"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <main>
            <p>
                Testing routing. <Link to='/addExercise'>add exercise</Link>, <Link to='/addWorkout'>add workout</Link>.
            </p>
            <p>
                This should link to this page: <Link to='/'>home</Link>.
            </p>
        </main>
    )
}

export default Home