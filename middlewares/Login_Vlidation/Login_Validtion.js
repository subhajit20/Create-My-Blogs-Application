/**************** External Imports******************************/
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const createError = require("http-errors");

const { sign_up } = require("../../schemas/Signup_schema");


/************************** User Schema model*******************/
const User = new mongoose.model("signupuser", sign_up);

const loginvalidate = [
    check("username")
        .isLength({ min: 3 })
        .withMessage("Your usename must be atleast 3 letter")
        .toLowerCase()
        .isAlphanumeric()
        .withMessage("Your usename must be in small letter")
        .custom(async (value) => {
            const myUsername = await User.findOne({ username: value });
            if (myUsername) {
                console.log("Email is valid")
            } else {
                throw createError("Invalid Credentials Please try again!");
            }
        }).trim(),

    check("password")
        .isStrongPassword()
        .withMessage(
            "Invalid Credentials Please try again!"
        )
];

function checkLoginValidation(req, res, next) {
    const errors = validationResult(req);
    const mappederror = errors.mapped();

    if (Object.keys(mappederror).length === 0) {
        next();
    } else if (Object.keys(mappederror).length > 0) {
        res.status(500).json({
            errors: mappederror
        })
    }
}

module.exports = {
    loginvalidate, checkLoginValidation
}