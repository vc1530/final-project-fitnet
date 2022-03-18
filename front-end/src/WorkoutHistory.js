import "./WorkoutHistory.css"
import {Link} from "react-router-dom"

const WorkoutHistory = () => {
    return(
        <main className="WorkoutHistory">
            <header className = "Feed-header">
                <h1><a href = "/WorkoutHistory" >Workout History</a></h1>
            </header>

            <body className="WorkoutHistory-info">
                <b><p>Workout #1</p></b>
            </body>
            
            {/* do we want a link to go back to My Profile or just leave it in the footer
             <Link to="/MyProfile"><button className="button">My Profile</button></Link> */}

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