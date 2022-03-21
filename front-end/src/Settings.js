import "./Settings.css"
import Header from "./Header"
import Footer from "./Footer" 
import { AiFillEdit } from 'react-icons/ai'
import React, { useState } from "react"
import profilepic from './blank_profile.jpg'
// import { BsSave } from "react-icons/bs"
//import axios from "axios"

const Settings = props => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    /**
    * A nested function that is called when the user submits the form to save changes.
    * @param {*} e
    */
     const submitForm = e => {
        e.preventDefault() // prevent normal browser submit behavior
        //NEEDS axios stuff here
        console.log("NYI: submitForm, AddExercise.js")
        setName(name)
        setUsername(username)
        setBio(email)
        setEmail(password)
        setPassword(bio)
    }

    // const saveChanges = e => {
    //     e.preventDefault() // prevent the default browser form submission stuff
    
    //     axios
    //       .post("https://someserversomehwere.com/puppy/save", {
    //         name: name,
    //         username: username,
    //         bio: bio,
    //         email: email,
    //         password: password,
    //       })
    //       .then(response => {
    //         // success
    //         console.log(`Received server response: ${response.data}`)
    //       })
    //       .catch(err => {
    //         // failure
    //         console.log(`Received server error: ${err}`)
    //       })
    //   }
    
    return (
        <main className="Settings">
            <Header 
                url = "./Settings" 
                title = "Settings"
            /> 
            <body id = "Settings-info" className="Post-box"> 
                <div id = "Settings-top"> 
                    <img id = "settingspic" src = {profilepic} alt = "me!"/> 
                    <b><a className = "User-link" href = "">Change Profile Picture</a></b>
                </div>
                <form className = "Settings-form" onSubmit = {submitForm}>
                    <p><h3><label for="name">Name <AiFillEdit /></label></h3></p>
                    <input 
                        type= "text" 
                        defaultValue = "John Doe"
                        onChange = {e => setName(e.target.value)}
                    />
                    <p><h3><label for="username">Username <AiFillEdit /></label></h3></p>
                    <input 
                        type= "text" 
                        defaultValue = "j.doe5"
                        onChange = {e => setName(e.target.value)}
                    />
                    <p><h3><label for="email">Email <AiFillEdit /></label></h3></p>
                    <input 
                        type= "text" 
                        defaultValue = "janedoe@gmail.com"
                        onChange = {e => setName(e.target.value)}
                    />
                    <p><h3><label for="password">Password <AiFillEdit /></label></h3></p>
                    <input 
                        type= "password" 
                        defaultValue = "abcasdfjaiosdf"
                        onChange = {e => setName(e.target.value)}
                    />
                    <p><h3><label for="bio">Bio <AiFillEdit /></label></h3></p>
                    <textarea 
                        id = "settingsbio"
                        maxlength = "432"
                        type= "text" 
                        defaultValue = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
                        onChange = {e => setName(e.target.value)}
                    />
                    <button id="settings-button">Save Changes</button>
                </form>
            </body>
            <div> 

            </div>
            <Footer 
                title = "Settings" 
            /> 
        </main>
    )
}

export default Settings