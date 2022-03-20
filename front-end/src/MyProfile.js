import "./MyProfile.css"
import profilepic from "./blank_profile.jpg"
import {Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer" 
import React, { useState } from "react"


const MyProfile = props => {
    return(
        <main className="MyProfile">
            <Header 
                url = "./MyProfile" 
                title = "My Profile"
            /> 
            <body className = "MyProfile-info">
                <img className="img" src={profilepic} alt="profile img"/>
                <p className="border">John Doe</p>
                <p className="border">@j.doe5</p>
                <p className="border">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                <Link to="/workoutHistory"><button className="button">Workout History</button></Link>
                <Link to="/Playlists"><button className="button">Playlists</button></Link>
            </body>
            <Footer 
                title = "My Profile" 
            /> 
        </main>
    )
}

export default MyProfile