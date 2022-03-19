import "./Settings.css"
import {Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer" 

const Settings = () => {
    return (
        <main className="Settings">
            <Header 
                url = "./Settings" 
                title = "Settings"
            /> 
            <body className="Settings-info">
                <p>Dummy text in bordered thing</p>
            </body>
            <Footer 
                title = "Settings" 
            /> 
        </main>
    )
}

export default Settings