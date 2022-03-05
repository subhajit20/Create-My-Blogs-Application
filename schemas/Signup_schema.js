const mongoose = require("mongoose");

const sign_up = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mydate: {
        type: Date,
        default: Date.now
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"blog"
        }
    ]
});



module.exports = {
    sign_up
}