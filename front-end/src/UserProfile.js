import "./UserProfile.css"
import { useParams } from "react-router-dom";
import user_database from "./mock_users.json"
import { Link } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

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
                <body className = "UserProfile-info"> 
                    <h3> Sorry, no such user exists. </h3>
                    <h3>Return to <Link to = "/Feed">Feed</Link>? </h3>
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
            <body className = "UserProfile-info">
                <img className = "UserProfile-pic" src = {user.profile_pic} alt = "me!" /> 
                <h2> {user.name}</h2>
                <h3><a href = {"/" + user.username}>{user.username}</a></h3>
                <p>{user.bio}</p>
            </body> 
            <Footer/> 
        </main>
        )

}

export default UserProfile