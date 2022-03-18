import "./MyProfile.css"
import profilepic from "./blank_profile.jpg"
import {Link} from "react-router-dom"

const MyProfile = () => {
    return(
        <main className="MyProfile">
            <header className = "Feed-header">
                <h1> <a href = "/MyProfile" >My Profile</a></h1>
            </header>
            <body className = "MyProfile-info">
                <img className="img" src={profilepic} alt="profile img"/>
                <p className="border">John Smith</p>
                <p className="border">@j.smith5</p>
                <p className="border">Words for bio go here</p>
                <Link to="/workoutHistory"><button className="button">Workout History</button></Link>
                <Link to="/Playlists"><button className="button">Playlists</button></Link>
            </body>
            <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "#">Create a new post</a>
                    <a href="/Feed">Feed</a>
                    <b><a href="#">My Profile</a></b>
                    <a href="/Settings">Settings</a>
                </nav>
            </footer>
        </main>
    )
}

export default MyProfile