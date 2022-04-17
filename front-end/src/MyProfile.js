import "./MyProfile.css"
import blankpic from "./images/blank_profile.jpg"
import Header from "./Header"
import Footer from "./Footer" 
import { useState, useEffect } from 'react'
import axios from "axios"
import { Navigate } from "react-router-dom"

const MyProfile = () => {

    const jwtToken = localStorage.getItem("token") 
    //console.log(`JWT token: ${jwtToken}`)

    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) 
    
    const [name, setName] = useState("") 
    const [username, setUsername] = useState("") 
    const [bio, setBio] = useState("") 
    const [profile_pic, setProfile_pic] = useState("")

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, { 
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        .then(res => { 
            setName(res.data.user.name) 
            setUsername(res.data.user.username) 
            setBio(res.data.user.bio) 
            setProfile_pic(res.data.user.profile_pic) 
        })
        .catch(err => { 
            console.error(err) 
            console.log("Invalid token") 
            setIsLoggedIn(false) 
        })
    }, [])

    if (isLoggedIn) 
        return(
            <main className="MyProfile">
                <Header 
                    url = "./MyProfile" 
                    title = "My Profile"
                /> 
                <body id = "MyProfile-info" className = "Post-box">
                    <img className="UserProfile-pic" src={profile_pic ? profile_pic : blankpic} alt="profile img"/>
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
    else return <Navigate to ="/login?error=protected" /> 
}

export default MyProfile