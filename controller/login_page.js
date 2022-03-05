/********************External Imports***************************/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*****   Internal Imports  ***********/
const { sign_up } = require("../schemas/Signup_schema");

/************************** User Schema model*******************/
const User = new mongoose.model("signupuser", sign_up);


function myloginRouter(req, res) {
    try {
        res.status(200).render('Login', {
            title: "Login Page"
        })
    } catch (err) {
        res.status(500).send("Invalid Credential")
    }
}

async function fetchUser(req, res) {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (isValidPassword) {
            const token = await jwt.sign({
                id: user._id,
                username: user.username,
                email: user.email
            }, process.env.SECRET_KEY, {
                expiresIn: process.env.DEAD
            })
            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: process.env.DEAD,
                httpOnly: true,
                signed: true
            });
            res.status(200).json({
                successfull: {
                    msg: "Login succesfull"
                }
            })
        } else {
            res.status(400).json({
                errors: {
                    msg: "Username is not Valid"
                }
            })
        }
    } else {
        res.status(500).json({
            errors: {
                msg: "Invalid Credentials"
            }
        })
    }
}


module.exports = {
    myloginRouter, fetchUser
}