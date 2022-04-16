import "./Login.css"
import Header from "./Header"
import { useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import axios from "axios"

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState('') 
    const [passwordError, setPasswordError] = useState('') 

    const changeUsername = (e) => { 
        setUsername(e.target.value); 
    }

    const changePassword = (e) => { 
        setPassword(e.target.value); 
    }

    const handleSubmit = e => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("Hello", "HELLLOOO"); 
        formData.append("username", username);
        formData.append("password", password);
        console.log(formData.get("username")) 
        axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/loginVerify`, 
        { 
            username: username, 
            password: password, 
        })
        .then(res => {
            console.log("user " + username + " has been logged in") 
        })
        .catch(err => { 
            console.error(err);
            console.log("Log In Failed");
            if (err.response?.status === 401) 
                setUsernameError("Username does not exist") 
            if (err.response?.status === 402) 
                setPasswordError("Wrong password") 
        })
    }

    return (
        <main className = "Login">
            <Header 
                url = "./Login" 
                title = "Login"
            />
            <a id = "back-link" className = "User-link" href = "./"><AiOutlineLeft size = {'28px'} /></a>
            <body id="Login-info" className = "Post-box">
                <h1>Log in to FitNet</h1>
                <h2>Don't have an account? Register <a className = "User-link" href="/SignUp"> here</a>.</h2>
                <form onSubmit = {handleSubmit} id="Login-form">
                    <label>Username</label>
                    <input 
                        name = "username" 
                        type="text" 
                        value = {username} 
                        className="form-control" 
                        placeholder="Username" 
                        onChange = {e => { 
                            changeUsername(e) 
                            setUsernameError('') 
                        }}
                    />
                    {usernameError ? <p className = "error">{usernameError}</p> : ""}
                    <label>Password</label>
                    <input 
                        name = "password" 
                        type="password" 
                        value = {password} 
                        className="form-control" 
                        placeholder="Password" 
                        onChange = {e => { 
                            changePassword(e) 
                            setPasswordError('') 
                        }}
                    />
                    {passwordError ? <p className = "error">{passwordError}</p> : ""}
                    <h4><a className = "User-link" href ="/ForgotPassword">Forgot your password?</a></h4>
                    <div className = "submit-button" >
                        <button>Login</button>
                    </div> 
                </form>
            </body>
        </main>
    )
}

export default Login