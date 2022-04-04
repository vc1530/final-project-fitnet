import "./MyProfile.css"
import profilepic from "./images/blank_profile.jpg"
import {Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer" 
import React, { useState } from "react"
import UserProfile from "./UserProfile"
import { useState, useEffect } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useParams } from "react-router-dom";
import axios from "axios"


const MyProfile = props => {

    const dummyProfile = (profileName, profileUsername, profileBio) => {
        const name = profileName
        const username = profileUsername
        const bio = profileBio
        return {name, username, bio}
    }

    const profile1 = dummyProfile("John Smith", "JS10", "I am 20")
    const profile2 = dummyProfile("Joe Shmo", "JS11", "I am 21")
    const profile3 = dummyProfile("Daniel Oh", "DO9", "I am 22")

    const [profiles, setProfiles] = useState({}) 

    let params = useParams(); 

    useEffect(() => { 
        console.log("retrieving profile " + params.id) 
        axios 
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + params.id) 
        .then(res => { 
            setProfiles(res.data.profiles)
            console.log("successful retrieval of profile information " + params.id + " from database")
        })
        .catch(err => { 
            console.log("retrieval of profile inoformation " + params.id + " from backend failed") 
            console.log(err)
        })
    }, [params.id]) 

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