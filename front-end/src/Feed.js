import "./Feed.css"
import FeedPost from "./FeedPost" 
import post_database from "./mock_posts.json" 
import Header from "./Header"
import Footer from "./Footer"

const Feed = () => { 

    let posts = post_database; 
    
    return ( 
        <main id = "Feed">
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
            <Footer 
                title = "Feed" 
            /> 
        </main>
    )
}

export default Feed