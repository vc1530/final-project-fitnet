const app = require("./app")

app.get("/retrieve-posts", (req, res) => {
    // would need to sort the data being retrieved from mongodb by date
    // should be possible with a function in mongodb
    // returning a sample post for now
    const body = {
        username: "lbloomer",
        description:"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        picture:"http://dummyimage.com/219x100.png/dddddd/000000"
    }
})