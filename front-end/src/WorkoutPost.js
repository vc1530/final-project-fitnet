import "./WorkoutPost.css" 
import music_picture from "./music.png"


const WorkoutPost = props => {   

    return ( 
        <main className = "Post-box">
            <img src = {music_picture} alt = "Music Link" width = "100px"/>
            <p><b><a href = {"/" + props.name} className = "Post-link">{props.name}</a></b></p>
            <p>{props.description}</p>
        </main>
    )

}

export default WorkoutPost