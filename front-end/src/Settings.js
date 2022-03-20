import "./Settings.css"
import Header from "./Header"
import Footer from "./Footer" 
import { AiFillEdit } from 'react-icons/ai'

const Settings = () => {
    return (
        <main className="Settings">
            <Header 
                url = "./Settings" 
                title = "Settings"
            /> 
            <body id = "Settings-info" className="Post-box"> 
                <h3>Name<AiFillEdit/></h3>
                <p id="name" >John Doe</p>
                <h3>Username <AiFillEdit/></h3>
                <p id="username" >j.doe5</p>
                <h3>Email <AiFillEdit/></h3>
                <p id="email" >janedoe@gmail.com</p>
                <h3>Password <AiFillEdit/></h3>
                <p id="password" >********</p>
                <h3>Bio <AiFillEdit/></h3>
                <p id="bio" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
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