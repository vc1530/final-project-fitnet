import "./Feed.css"
import FeedPost from "./FeedPost" 
import post_database from "./mock_posts.json" 
import Header from "./Header"
import { Link } from "react-router-dom"

const Feed = () => { 

    let posts = post_database; 

    return ( 
        <main className = "Feed">
            <Header
                url = "./Feed" 
                title = "Feed"
            /> 
            <body className = "Feed-posts">
                {posts.map((post) => ( 
                <FeedPost 
                    username = {post.username} 
                    picture = {post.picture} 
                    description = {post.description}
                /> 
                )) 
                }      
            </body>
            <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "#">Create a new post</a>
                    <b><a href="/Feed">Feed</a></b>
                    <a href="/MyProfile">My Profile</a>
                    <a href="#">Settings</a>
                </nav>
            </footer>
        </main>
    )
}

export default Feed