import "./WorkoutPost.css" 
import music_picture from "./music.png"


const WorkoutPost = props => {   

    return ( 
        <main className = "Post-box">
            <div className="Post-box-right">
            <img src = {music_picture} alt = "Music Link" width = "50px"/>
            </div>
            
            <p><b><a href = {"/" + props.name} className = "Post-link">{props.name}</a></b></p>
            <p>{props.description}</p>
        </main>
    )

}

export default WorkoutPost