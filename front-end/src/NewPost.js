import "./NewPost.css"
import Header from "./Header"
import Footer from "./Footer" 

const NewPost = () => {
    return(
        <main className="NewPost">
            <Header 
                url = "./NewPost" 
                title = "Create a new post"
            /> 
            <body id = "NewPost-info" className = "Post-box">
                <a href = "./NewPost" className = "User-link">Choose an image</a>
                <textarea id = "newpost-description"
                    placeholder = "write a description..."
                    maxlength = "258"
                />
            </body>
            <div id = "post-button" className = "blue-button">
                <a className = "User-link" href = "/Feed">Post</a>
            </div>
            <Footer 
                title = "Create a new post" 
            />
        </main>
    )
}

export default NewPost