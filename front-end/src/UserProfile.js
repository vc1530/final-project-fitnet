import "./UserProfile.css"
import { useParams } from "react-router-dom";

const profiles = [ 

    { 
        username: "lizzyxx", 
        profile_img: "https://i.pinimg.com/564x/42/02/d1/4202d1040da300b86359237107fb5d3d.jpg",
        name: "Liz Grant",
        bio: "just a texan gal living her best life! live laugh love, always and forever x",
    },

    {
        username: "getgains", 
        profile_img: "https://64.media.tumblr.com/28c0afb56a9fabd2b79730093d23214f/tumblr_pkinqhV8CF1teuhbu_540.jpg", 
        name: "Bartholomew The Fifth",
        bio: "work hard, play hard. never give up on ur dreams", 
    }

]

const UserProfile = props => { 
    
    let params = useParams(); 

    const user = profiles.find(x => x.username === params.username); 

    return ( 
        <main className = "UserProfile"> 
            <header className = "Feed-header">
                <h1><a href = "/Feed" >Feed</a></h1>
            </header>
            <body className = "UserProfile-info">
                <img className = "UserProfile-pic" src = {user.profile_img} alt = "me!" /> 
                <h2> {user.name}</h2>
                <h3><a href = {"/" + user.username}>{user.username}</a></h3>
                <p>{user.bio}</p>
            </body> 
            <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "#">Create a new post</a>
                    <a href="/Feed">Feed</a>
                    <a href="#">My Profile</a>
                    <a href="#">Settings</a>
                </nav>
            </footer>
        </main>
    )

}

export default UserProfile
