import "./Feed.css"
import FeedPost from "./FeedPost" 
import { Link } from "react-router-dom"

const Feed = () => { 

    const posts = [ 

        {
            username: "lizzyxx", 
            image: "https://dummyimage.com/600x400/000/fff",
            description: "This is me working out!", 

        }, 

        {
            username: "getgains", 
            image: "https://dummyimage.com/600x400/000/fff", 
            description: "Today's workout. getting gains", 
        }

    ]

    return ( 
        <main className = "Feed">
            <header className = "Feed-header">
                <h1>Feed</h1>
            </header>
            <body className = "Feed-posts">
                {posts.map((post) => ( 
                <FeedPost 
                    username = {post.username} 
                    image = {post.image} 
                    description = {post.description}
                /> 
                )) 
                }      
            </body>
            <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "#">Create a new post</a>
                    <b><a href="/Feed">Feed</a></b>
                    <a href="#">My Profile</a>
                    <a href="#">Settings</a>
                </nav>
            </footer>
        </main>
    )
}

export default Feed