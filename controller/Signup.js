/********************External Imports***************************/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/************** Internal Imports*******************************/
const { sign_up } = require("../schemas/Signup_schema");


/************************** User Schema model*******************/
const User = new mongoose.model("signupuser", sign_up);

function sigupPage(req, res) {
    res.status(200).render("signup_page", {
        title: "Signup Page"
    });
}

async function addUser(req, res) {
    const password = req.body.password;
    const encpassword = await bcrypt.hash(password, 10);
    try {
        const newuser = await new User({
            ...req.body,
            password: encpassword,
        });
        await newuser.save();
        res.status(200).json({
            successfull: {
                msg: "Signup Successfull"
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            unsuccessfull: {
                msg: "Signup unsuccessfull"
            }
        })
    }
}


module.exports = {
    sigupPage, addUser
}