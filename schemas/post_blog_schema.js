const mongoose = require("mongoose");

const blog_post = new mongoose.Schema({
    blog: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    }
    ,
    mydate: {
        type: Date,
        default: Date.now
    },
    images: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
})



module.exports = {
    blog_post
}