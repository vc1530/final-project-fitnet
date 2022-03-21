import "./Login.css"
import {Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer" 
import { useState } from 'react'



function Login() {


    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [submitted, setSubmitted] = useState(false)
    const [fieldsFilled, setFieldsFilled] = useState(false)


    return (
        <main className="Login Page">
            <Header 
                url = "./Login" 
                title = "Login"
            />
            <body className="SignUp-info">
                <h1>Log into your FitNet Account!</h1>
                <h2>Don't have an account? Register <Link to="/SignUp"> here</Link>!</h2>
                <div className="form-group">
                    <label>Username</label><br></br>
                    <input value={username} type="text" className="form-control" placeholder="Username" /><br></br>
                    <label>Password</label><br></br>
                    <input value={password} type="text" className="form-control" placeholder="Password" /><br></br>
                    <button type="button">Login</button>
                </div>
                <h4><Link to="/ForgotPassword">Forgot your password?</Link></h4>
            </body>
            <Footer 
                title = "Login" 
            /> 
        </main>
    )
}

export default Login