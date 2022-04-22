const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema( 
    { 
        username: { 
            type: String, 
            required: true, 
        },
        description: { 
            type: String, 
            required: true, 
        }, 
        picture: { 
            data: Buffer,
            contentType: String,
            required: false, 
        },
    }, 
)

const Post = mongoose.model('Post', postSchema) 

module.exports = { 
    Post, 
}