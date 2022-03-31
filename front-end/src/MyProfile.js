import "./MyProfile.css"
import profilepic from "./images/blank_profile.jpg"
import {Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer" 
import React, { useState } from "react"
import UserProfile from "./UserProfile"


const MyProfile = props => {

    return(
        <main className="MyProfile">
            <Header 
                url = "./MyProfile" 
                title = "My Profile"
            /> 
            <body id = "MyProfile-info" className = "Post-box">
                <img className="UserProfile-pic" src={profilepic} alt="profile img"/>
                <div className = "UserProfile-title"> 
                    <p id = "myname" >John Doe</p>
                    <p><i><a id="myusername" className = "User-link" href = {"/j.doe5"}>j.doe5</a></i></p>
                </div>
                <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                <div className = "blue-button"> 
                    <a className = "User-link" href="/workoutHistory">Workout History</a> 
                </div>
            </body>
            <Footer 
                title = "My Profile" 
            /> 
        </main>
    )
}

export default MyProfile