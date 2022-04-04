import "./MyProfile.css"
import profilepic from "./images/blank_profile.jpg"
import Header from "./Header"
import Footer from "./Footer" 
//import { useState, useEffect } from 'react'
//import { useParams } from "react-router-dom";
//import axios from "axios"


const MyProfile = props => {

    // const dummyProfile = (profileName, profileUsername, profileBio) => {
    //     const name = profileName
    //     const username = profileUsername
    //     const bio = profileBio
    //     return {name, username, bio}
    // }

    // const profile1 = dummyProfile("John Smith", "JS10", "I am 20")
    // const profile2 = dummyProfile("Joe Shmo", "JS11", "I am 21")
    // const profile3 = dummyProfile("Daniel Oh", "DO9", "I am 22")

    // const [profiles, setProfiles] = useState({}) 

    // let params = useParams(); 

    // useEffect(() => { 
    //     console.log("retrieving profile " + params.id) 
    //     axios 
    //     .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + params.id) 
    //     .then(res => { 
    //         setProfiles(res.data.profiles)
    //         console.log("successful retrieval of profile information " + params.id + " from database")
    //     })
    //     .catch(err => { 
    //         console.log("retrieval of profile inoformation " + params.id + " from backend failed") 
    //         console.log(err)
    //     })
    // }, [params.id]) 

    return(
        <main className="MyProfile">
            <Header 
                url = "./MyProfile" 
                title = "My Profile"
            /> 
            <body id = "MyProfile-info" className = "Post-box">
                <img className="UserProfile-pic" src="http://dummyimage.com/200x100.png/5fa2dd/ffffffilepic" alt="profile img"/>
                <div className = "UserProfile-title"> 
                    <p id = "myname" >Lonni Padilla</p>
                    <p><i><a id="myusername" className = "User-link" href = {"/lpadilla0"}>lpadilla0</a></i></p>
                </div>
                <p >Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.</p>
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