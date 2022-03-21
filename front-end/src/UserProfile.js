import "./UserProfile.css"
import { useParams } from "react-router-dom";
import user_database from "./mock_users.json"
import { Link } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { AiOutlineLeft } from 'react-icons/ai'

const UserProfile = () => { 
  
    let profiles = user_database; 
    
    let params = useParams(); 

    const user = profiles.find(x => x.username === params.username); 

    if (typeof user == 'undefined') 
        return (
            <main className = "UserProfile">
                 <Header 
                    url = "./Feed" 
                    title = "Feed" 
                /> 
                <body className = "Post-box"> 
                    <h3> Sorry, no such user exists. </h3>
                    <h3>Return to <Link className = "User-link" to = "/Feed">Feed</Link>? </h3>
                </body>
                <Footer/> 
            </main>
        )
    return ( 
        <main className = "UserProfile"> 
            <Header 
                url = "./Feed" 
                title = "Feed" 
            />
            <a id = "back-link" className = "User-link" href = "./Feed"><AiOutlineLeft size = {'28px'} /></a>
            <body id = "UserProfile-info" className = "Post-box">
                <img className = "UserProfile-pic" src = {user.profile_pic} alt = "me!" /> 
                <div className = "UserProfile-title">
                    <p id = "name">{user.name}</p>
                    <p><i><a id = "username" className = "User-link" href = {"/" + user.username}>{user.username}</a></i></p>
                </div>
                <p>{user.bio}</p>
            </body> 
            <Footer/> 
        </main>
        )

}

export default UserProfile