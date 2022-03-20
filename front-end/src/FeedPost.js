import "./FeedPost.css" 
import user_database from "./mock_users.json" 

const FeedPost = props => {   

    let profiles = user_database; 

    const user = profiles.find(x => x.username === props.username); 

    if (typeof user == 'undefined') 
        return (<main></main>)

    return ( 
        <main className = "Post-box">
            <img className = "Post-image" src = {props.picture} alt = "Post" />
            <section className = "Profile-info">
                    <img className = "Profile-image" src = {user.profile_pic} alt = "Profile" /> 
                    <div className = "Profile-hover">
                        <div className = "Profile-link">
                            <b><a className = "User-link" href = {"/" + props.username} >{props.username}</a></b> 
                        </div> 
                    <div className = "Profile-card"> 
                        <div className = "card-top"> 
                            <img src = {user.profile_pic} alt = "profile" /> 
                            <div className = "card-names">
                                <b><p><a className = "User-link" href = {"/" + props.username}>{user.username}</a></p></b>
                                <p>{user.name}</p> 
                            </div> 
                        </div>
                        <p id = "bio">{user.bio}</p>
                    </div>
                </div>
            </section>
            <p>{props.description}</p>
        </main>
    )

}

export default FeedPost