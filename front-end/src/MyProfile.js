import "./MyProfile.css"
import profilepic from "./blank_profile.jpg"

const MyProfile = () => {
    return(
        <main className="MyProfile">
            <header className = "Feed-header">
                <h1> <a href = "/MyProfile" >My Profile</a></h1>
            </header>
            <body className = "MyProfile-info">
                <img class="img" src={profilepic} alt="profile img"/>
                <p class="border">John Smith</p>
                <p class="border">@j.smith5</p>
                <p class="border">Words for bio go here</p>
            </body>
            <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "#">Create a new post</a>
                    <a href="/Feed">Feed</a>
                    <b><a href="#">My Profile</a></b>
                    <a href="#">Settings</a>
                </nav>
            </footer>
        </main>
    )
}

export default MyProfile