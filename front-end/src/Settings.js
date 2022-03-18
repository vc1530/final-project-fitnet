import "./Settings.css"
import {Link} from "react-router-dom"

const Settings = () => {
    return (
        <main className="Settings">
            <header className = "Feed-header">
                <h1> <a href = "/Settings" >Settings</a></h1>
            </header>
            <body className="Settings-info">
                <p>Dummy text in bordered thing</p>
            </body>
            <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "#">Create a new post</a>
                    <a href="/Feed">Feed</a>
                    <a href="/MyProfile">My Profile</a>
                    <b><a href="/Settings">Settings</a></b> {/*make sure to bold the page you are on */}
                </nav>
            </footer>
        </main>
    )
}

export default Settings