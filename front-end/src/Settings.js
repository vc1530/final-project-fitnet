import "./Settings.css"
import Header from "./Header"
import Footer from "./Footer" 
import { AiFillEdit } from 'react-icons/ai'
import React, { useEffect, useState } from "react"
import profilepic from './images/blank_profile.jpg'

import { BsSave } from "react-icons/bs"
//import axios from "axios"

const Settings = props => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // // for uploading profile image
    // const [uploadStatus, setUploadStatus] = useState('');
    // // need to add: {uploadStatus} somewhere
    // app.use('/', express.static(path.join(__dirname, '/')));

    // app.get("/api/image", (req,res) => {
    //     const id = 1;
    //     const sqlInsert = "SELECT * FROM images WHERE id = ?;"

    //     connection.query(sqlInsert, [id], (err,result) => {
    //         if (err) {
    //             console.log(err)
    //             res.send({
    //                 msg: err
    //             })
    //         }

    //         if (result) {
    //             res.send({
    //                 image: result[0].image,
    //             });
    //         }
    //     });
    // })

    // const [image,setImage] = useState('');

    // useEffect(() => {
    //     fetch(`http://localhost:8000/api/image`, {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": 'application/json, charset=UTF-8',
    //             'Accept': 'application/json, text/html',
    //         },
    //         credentials: 'include',
    //     })
    //     .then(data => data.json())
    //     .then((data) => {
    //         console.log(data)
    //             setImage('http://localhost:8000/' + data.image)
    //             console.log(image)
    //     });
    // })
    // {image && <img src={image} alt="img"/>}

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
                <form onSubmit = {submitForm}>
                    <label for="name">Name <AiFillEdit /></label>
                    <input 
                        type= "text" 
                        defaultValue = "John Doe" // insert state variable 
                        onChange = {e => setName(e.target.value)}
                    />
                    <label for="username">Username <AiFillEdit /></label>
                    <input 
                        type= "text" 
                        defaultValue = "j.doe5"
                        onChange = {e => setName(e.target.value)}
                    />
                    <label for="email">Email <AiFillEdit /></label>
                    <input 
                        type= "text" 
                        defaultValue = "janedoe@gmail.com"
                        onChange = {e => setName(e.target.value)}
                    />
                    <label for="password">Password <AiFillEdit /></label>
                    <input 
                        type= "password" 
                        defaultValue = "abcasdfjaiosdf"
                        onChange = {e => setName(e.target.value)}
                    />
                    <label for="bio">Bio <AiFillEdit /></label>
                    <textarea 
                        id = "settingsbio"
                        maxlength = "432"
                        type= "text" 
                        defaultValue = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
                        onChange = {e => setName(e.target.value)}
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