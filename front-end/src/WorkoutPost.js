import "./WorkoutPost.css" 

const WorkoutPost = props => {   

    return ( 
        <main className = "Post-box">
            <p><b><a href = {"/" + props.name} className = "Post-link">{props.name}</a></b></p>
            <p>{props.description}</p>
        </main>
    )

}

export default WorkoutPost