import { Link } from "react-router-dom"
import "./FeedPost.css" 

const FeedPost = props => {   

    return ( 
        <div className = "Post-box">
            <img className = "Post-image" src = {props.image} alt = "Post" width = "300px" />
            <p><Link className = "Post-username" to={"/" + props.username}>{props.username}</Link></p>
            <p className ="Post-description">{props.description}</p>
        </div>
    )

}

export default FeedPost