import "./ForgotPassword.css"
import {Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer" 
import { useState } from 'react'



function ForgotPassword() {

    const [email, setEmail] = useState('')

    return (
        <main className="Forgot Password Page">
            <Header 
                url = "./ForgotPassword" 
                title = "ForgotPassword"
            />
            <body className="ForgotPassword-info">
            <h1>Forgot Your Password?</h1>
            <h3>Enter your email address below to receive a password reset link.</h3>
            <label>Email</label><br></br>
            <input value={email} type="text" className="form-control" placeholder="Email" /><br></br>
            <button type="button">Submit</button>
            </body>
            <Footer 
                title = "ForgotPassword" 
            /> 
        </main>
    )
}

export default ForgotPassword