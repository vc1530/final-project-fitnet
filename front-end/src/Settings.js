import "./Settings.css"
import Header from "./Header"
import Footer from "./Footer" 
import { AiFillEdit } from 'react-icons/ai'
import React  from "react"
import profilepic from './images/blank_profile.jpg'
import axios from "axios"

const Settings = props => {

    const [name, setName] = React.useState("John Doe")
    const [username, setUsername] = React.useState("j.doe5")
    const [bio, setBio] = React.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.")
    const [email, setEmail] = React.useState("janedoe@gmail.com")
    const [password, setPassword] = React.useState("abcasdfjaiosdf")
    const [selectedFile, setSelectedFile] = React.useState(null)
    
    const handleSubmit = e => {
        e.preventDefault() // prevent the default browser form submission stuff
    
        console.log("this is a test")

        //code taken from Stack Overflow 
        //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
        };

        //code taken from Stack Overflow 
        //https://stackoverflow.com/questions/7331289/javascript-function-valid-username
        const validateUsername = (username) => {
            return /^[0-9a-zA-Z_.-]+$/.test(username);
        }

        let valid = true 

        if (name === "") { 
            valid = false; 
            alert("Invalid name")
        } 
        if (username === "" || !validateUsername(username)) { 
            valid = false; 
            alert ("Invalid username")
        } 
        if (email === "" || !validateEmail(email)) { 
            valid = false; 
            alert("Invalid email")
        } 
        if (password === "") { 
            valid = false; 
            alert ("Invalid password") 
        } 

        if (valid) { 
            const formData = new FormData();
            formData.append("name", name);
            formData.append("username", username);
            formData.append("bio", bio);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("image", selectedFile); // does the image need a state variable
                axios({
                        method: "post",
                        url: `${process.env.REACT_APP_SERVER_HOSTNAME}/save-changes`,
                        data: formData,
                        headers: {"Content-Type": "multipart/form-data"},
                    }).catch(console.log).then((response) => console.log('response=', response))
        } 
      }

      // do i need this 
      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
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
                    {/* added to this */}
                    <input type="file" name="image" accept="image/*" multiple={false} onChange = {handleFileSelect} />
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