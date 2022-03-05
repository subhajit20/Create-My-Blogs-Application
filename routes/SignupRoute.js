const express = require("express");

const signuproutes = express.Router();

/**
 * Internal imports
 */
const { uservalidate, checkValidation } = require("../middlewares/Uservalidation/user_validation");
const { sigupPage, addUser } = require("../controller/Signup");
const { uploadFile } = require("../middlewares/FileUploads/fileUpload_validation");


signuproutes.get("/signup", sigupPage);


signuproutes.post("/", uploadFile, uservalidate, checkValidation, addUser);


module.exports = {
    signuproutes
}
