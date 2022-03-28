const app = require("./app")

app.get("/new-post", (req, res) => {
    // assemble an object with the data we want to send
    const body = {
      title: "Create a new post!",
      heading: "New Post!",
      image: "",
      message: "Image will be uploaded here",
      message: "Description will be uploaded here",
    }
})

app.post("/new-post", (req, res) =>{
    const body = {
        title: "Post will be added to feed",
        heading: "Feed",
        message: "This dummy text will indicate that post has been added to feed",
    }
})