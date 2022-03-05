/**************** External Imports******************************/
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const createError = require("http-errors");

const { sign_up } = require("../../schemas/Signup_schema");


/************************** User Schema model*******************/
const User = new mongoose.model("signupuser", sign_up);

const uservalidate = [
    check("username")
        .isLength({ min: 3 })
        .withMessage("Your usename must be atleast 3 letter")
        .toLowerCase()
        .withMessage("Your usename must be in small letter")
        .isAlphanumeric()
        .withMessage("Your usename must be alphanumeric")
        .custom(async (value) => {
            const email = await User.findOne({ username: value });
            if (email) {
                throw createError("Username is already exist");
            } else {
                console.log("Username is available")
            }
        }).trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            const email = await User.findOne({ email: value });
            if (email) {
                throw createError("Email is already exist");
            } else {
                console.log("Email is available")
            }
        }).trim(),
    check("password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        )
];

function checkValidation(req, res, next) {
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
    uservalidate, checkValidation
}