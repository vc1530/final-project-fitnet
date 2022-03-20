import "./NewPost.css"
import {Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer" 

const NewPost = () => {
    return(
        <main className="NewPost">
            <Header 
                url = "./NewPost" 
                title = "Create a new post"
            /> 
            <body className = "NewPost-info">
                <p className="border">Words for new post information go here</p>
                <Link to="/Feed"><button className="button">Post</button></Link>
            </body>
            <Footer 
                title = "Create a new post" 
            />
        </main>
    )
}

export default NewPost