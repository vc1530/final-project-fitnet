import "./Feed.css"
import FeedPost from "./FeedPost" 

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
            <h1>Hello and welcome to the feed!</h1>
        <div className = "FeedPosts">
            {posts.map((post) => ( 
              <FeedPost 
                username = {post.username} 
                image = {post.image} 
                description = {post.description}
            /> 
            )) 
            }      
        </div>
        </main> 
    )
}

export default Feed