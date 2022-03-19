import "./NewPost.css"
import {Link} from "react-router-dom"
import Header from "./Header"

const NewPost = () => {
    return(
        <main className="NewPost">
            <Header 
                url = "./NewPost" 
                title = "New Post"
            /> 
            <body className = "NewPost-info">
                <p className="border">Words for new post information go here</p>
                <Link to="/Feed"><button className="button">Post</button></Link>
            </body>
            <footer className = "Feed-footer">
                <nav className = "Feed-links"> 
                    <a href= "/NewPost">Create a new post</a>
                    <a href="/Feed">Feed</a>
                    <b><a href="#">My Profile</a></b>
                    <a href="/Settings">Settings</a>
                </nav>
            </footer>
        </main>
    )
}

export default NewPost