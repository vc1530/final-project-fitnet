import { Link } from "react-router-dom"
import "./FeedPost.css" 

const FeedPost = props => {   

    return ( 
        <main className = "Post-box">
            <img src = {props.image} alt = "Post" width = "300px" />
            <p><b><a href = {"/" + props.username} className = "Post-link">{props.username}</a></b></p>
            <p>{props.description}</p>
        </main>
    )

}

export default FeedPost