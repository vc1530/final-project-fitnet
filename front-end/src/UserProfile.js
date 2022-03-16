import "./UserProfile.css"
import { useParams } from "react-router-dom";

const profiles = [ 

    { 
        username: "lizzyxx", 
        profile_img: "https://pbs.twimg.com/profile_images/468225594430599168/YTL0b1f3_400x400.jpeg",
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
        <div>
        <h1>{user.name}</h1>
        <h1>{user.username}</h1>
        <img src = {user.profile_img} alt = "me!" width = "300px" /> 
        <p>{user.bio}</p>
        </div>
    )

}

export default UserProfile
