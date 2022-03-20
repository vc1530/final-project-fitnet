import "./Settings.css"
import Header from "./Header"
import Footer from "./Footer" 
import {FaEdit} from 'react-icons/fa'

const Settings = () => {

    return (
        <main className="Settings">
            <Header 
                url = "./Settings" 
                title = "Settings"
            /> 
            <body id = "Settings-info" className="Post-box"> 
                <h3>Name<FaEdit/></h3>
                <p id = "demo" >John Doe</p>
                <h3>Username <FaEdit/></h3>
                <p>John Doe</p>
                <h3>Email <FaEdit/></h3>
                <p>janedoe@gmail.com</p>
                <h3>Password <FaEdit/></h3>
                <p>********</p>
                <h3>Bio <FaEdit/></h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
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