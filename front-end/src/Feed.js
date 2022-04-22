import "./Feed.css"
import FeedPost from "./FeedPost" 
import Header from "./Header"
import Footer from "./Footer"
import { useEffect, useState } from 'react' 
import axios from "axios"
import { Navigate } from "react-router-dom"

const Feed = () => { 

    const jwtToken = localStorage.getItem("token") 

    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) 

    const[posts, setPosts] = useState([])

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, { 
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        .then(res => { 
            getPosts() 
        })
        .catch(err => { 
            console.error(err) 
            console.log("Invalid token") 
            setIsLoggedIn(false) 
        })
    }, [])

    const getPosts = () => { 
        console.log("retrieving posts from backend") 
        axios 
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts`)
            .then(res => { 
                setPosts(res.data.posts) 
                console.log("successful retrieval of posts from database")
            })
            .catch(err => { 
                console.log("retrieval of posts from backend failed") 
                console.log(err)
            })
    }

    if (isLoggedIn) 
        return ( 
            <main id = "Feed">
                <Header
                    url = "./Feed" 
                    title = "Feed"
                />  
                <body className = "Feed-posts">
                        {posts.slice(0).reverse().map((post) => ( 
                            <FeedPost 
                                username = {post?.username} 
                                picture = {post?.picture} 
                                description = {post?.description}
                            /> 
                            )) 
                        }    
                </body>
                <Footer 
                    title = "Feed" 
                /> 
            </main>
        )
    else return <Navigate to ="/login?error=protected" /> 
}

export default Feed