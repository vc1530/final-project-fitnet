import "./MyProfile.css"
//import profilepic from "./images/blank_profile.jpg"
import Header from "./Header"
import Footer from "./Footer" 
import { useState, useEffect } from 'react'
import axios from "axios"

const MyProfile = () => {

    //default user until we finish login 
    const _id = "62570c4071b5c02be1b2d71d"

    const [name, setName] = useState("") 
    const [username, setUsername] = useState("") 
    const [bio, setBio] = useState("") 
    const [profile_pic, setProfile_pic] = useState("")

    useEffect(() => { 
        console.log("fetching profile for user " + _id) 
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/uid/` + _id) 
        .then(res => { 
            setName(res.data.user.name) 
            setUsername(res.data.user.username) 
            setBio(res.data.user.bio) 
            setProfile_pic(res.data.user.profile_pic) 
            console.log("successful retrieval of user " + _id + " from database")
        })
        .catch(err => { 
            console.error(err) 
            console.log("failed retrieval of user " + _id + " from database")
        })
    }, [])

    return(
        <main className="MyProfile">
            <Header 
                url = "./MyProfile" 
                title = "My Profile"
            /> 
            <body id = "MyProfile-info" className = "Post-box">
                <img className="UserProfile-pic" src={profile_pic} alt="profile img"/>
                <div className = "UserProfile-title"> 
                    <p id = "myname" >{name}</p>
                    <p><i><a id="myusername" className = "User-link" href = {"/" + username}>{username}</a></i></p>
                </div>
                <p id = "mpbio" >{bio}</p>
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