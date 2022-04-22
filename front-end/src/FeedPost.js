import "./FeedPost.css" 
import { useState, useEffect } from 'react' 
import axios from 'axios' 
import blankpic from "./images/blank_profile.jpg"

const FeedPost = props => {   

    const [user, setUser] = useState(null) 

    useEffect (() => { 
        console.log("fetching data for user " + props.username) 
        axios 
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/` + props.username)
        .then (res => { 
            setUser(res.data.user)
            console.log(res.data.user.profile_pic) 
            console.log("successful retrieval of user " + props.username + " from database")
        })
        .catch (err => { 
            console.error(err) 
            console.log("failed retrieval of user " + props.username + " from database")
        })
    }, [props.username])

    function handleClick () {
        window.location.replace(user.username)
    }

    const arrayBufferToBase64 = buffer => {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    if(!user) { 
        console.log("user not found") 
        return(
            <main className = "Post-box"> 
                <p>user not defined</p>
            </main>
        )
    } 

    else
        return ( 
            <main id = "FeedPost" className = "Post-box">
                <img className = "Post-image" src = {typeof props.picture != "string" ? `data:image/png;base64,${arrayBufferToBase64(props.picture.data.data)}` : blankpic} alt="profile img"/>
                <section className = "Profile-info">
                        <img 
                            className = "Profile-image" 
                            src = {user.profile_pic ? `data:image/png;base64,${arrayBufferToBase64(user.profile_pic.data.data)}`: blankpic} 
                            alt = "Profile" /> 
                        <div className = "Profile-hover">
                            <div className = "Profile-link">
                                <b><a className = "User-link" href = {"/" + props.username} >{props.username}</a></b> 
                            </div> 
                            <div className = "Profile-card" onClick = {handleClick}> 
                                <div className = "card-top"> 
                                    <img 
                                        src = {user.profile_pic ? `data:image/png;base64,${arrayBufferToBase64(user.profile_pic.data.data)}`: blankpic} 
                                        alt = "profile" /> 
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