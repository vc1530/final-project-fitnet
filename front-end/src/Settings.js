import "./Settings.css"
import Header from "./Header"
import Footer from "./Footer" 
import { AiFillEdit } from 'react-icons/ai'
import React, { useEffect, useState } from "react"
import profilepic from './images/blank_profile.jpg'

import { BsSave } from "react-icons/bs"
//import axios from "axios"

const Settings = props => {

    const [name, setName] = useState("John Doe")
    const [username, setUsername] = useState("j.doe5")
    const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.")
    const [email, setEmail] = useState("janedoe@gmail.com")
    const [password, setPassword] = useState("abcasdfjaiosdf")

    const handleSubmit = e => {
        e.preventDefault() // prevent the default browser form submission stuff
    
        // send the data of the new puppy to a server
        // this server doesn't exist, so we will see an error in the console
        // axios' get() and post() methods return a promise, so we can use our javascript Promise or async/await expertise here to deal with the resolution or rejection of the request
        axios
          .post("http://localhost:3000/save-changes", {
            name: name, 
            username: username, 
            password: password, 
            email: email, 
            bio: bio, 
          })
          .then(response => {
            // success
            console.log(`Received server response: ${response.data}`)
            alert("Received" ); 
          })
          .catch(err => {
            // failure
            console.log(`Received server error: ${err}`)
            alert("Did not receiv" + name + username); 
          })
      }
    
    return (
        <main className="Settings">
            <Header 
                url = "./Settings" 
                title = "Settings"
            /> 
            <body id = "Settings-info" className="Post-box"> 
                <div id = "Settings-top"> 
                    <img id = "settingspic" src = {profilepic} alt = "me!"/> 

                    <input type="file" name="image" accept="image/*" multiple={false} />
                </div>
                <form onSubmit = {handleSubmit}>
                    <label for="name">Name <AiFillEdit /></label>
                    <input 
                        type= "text" 
                        name = "name" 
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                    />
                    <label for="username">Username <AiFillEdit /></label>
                    <input 
                        type= "text" 
                        name = "username" 
                        value = {username} 
                        onChange = {e => setUsername(e.target.value)}
                    />
                    <label for="email">Email <AiFillEdit /></label>
                    <input 
                        type= "text" 
                        name = "email" 
                        value = {email} 
                        onChange = {e => setEmail(e.target.value)}
                    />
                    <label for="password">Password <AiFillEdit /></label>
                    <input 
                        type= "password" 
                        name = "password" 
                        value = {password} 
                        onChange = {e => setPassword(e.target.value)}
                    />
                    <label for="bio">Bio <AiFillEdit /></label>
                    <textarea 
                        id = "settingsbio"
                        maxlength = "432"
                        type= "text" 
                        value = {bio} 
                        onChange = {e => setBio(e.target.value)}
                    />
                    <div className = "submit-button">
                        <button>Save Changes</button>
                    </div>
                </form>
            </body>
            <div className = "bottom-links"> 
                <div id = "signout-button" className = "blue-button"> 
                    <a className = "User-link" href="/">Sign Out</a> 
                </div>
                <div id = "deleteaccount-button" className = "blue-button"> 
                    <a  className = "User-link" href="/">Delete Account</a> 
                </div>
            </div>
            <Footer 
                title = "Settings" 
            /> 
        </main>
    )
}

export default Settings