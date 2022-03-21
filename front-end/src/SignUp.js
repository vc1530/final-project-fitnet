import "./SignUp.css"
import {Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer" 
import { useState } from 'react'



function SignUp() {


    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [submitted, setSubmitted] = useState(false)
    const [fieldsFilled, setFieldsFilled] = useState(false)

    const changefirstName = (e) => {
        setfirstName(e.target.value)
    }

    const changelastName = (e) => {
        setlastName(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = () => {
        if (firstName == '' || lastName == '' || email == '' || username == '' || password == '') {
            setFieldsFilled(false)
        } else {
            setFieldsFilled(true)
            setSubmitted(true)
        }
    }


    return (
        <main className="Sign Up">
            <Header 
                url = "./SignUp" 
                title = "Sign Up"
            /> 
            <body className="SignUp-info">
                <h1>Sign up for FitNet!</h1>
                <h2>Already have an account? Log in <Link to="/LogIn"> here.</Link></h2>
                <div className="form-group">
                    <label>First Name</label><br></br>
                    <input onChange={changefirstName} value={firstName} type="text" className="form-control" placeholder="First Name" /><br></br>
                    <label>Last Name</label><br></br>
                    <input onChange={changelastName} value={firstName} type="text" className="form-control" placeholder="Last Name" /><br></br>
                    <label>Email</label><br></br>
                    <input onChange={changeEmail} value={firstName} type="text" className="form-control" placeholder="Email" /><br></br>
                    <label>Username</label><br></br>
                    <input onChange={changefirstName} value={firstName} type="text" className="form-control" placeholder="Username" /><br></br>
                    <label>Password</label><br></br>
                    <input onChange={changefirstName} value={firstName} type="text" className="form-control" placeholder="Password" /><br></br>
                    <button type="button">Sign Up</button>
                </div>
            </body>
            <Footer 
                title = "Sign Up" 
            /> 
        </main>
    )
}

export default SignUp