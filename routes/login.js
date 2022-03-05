const express = require("express");
const loginRouter = express.Router();
const { myloginRouter } = require('../controller/login_page')


/**
 * Internal imports
 */
const { loginvalidate, checkLoginValidation } = require("../middlewares/Login_Vlidation/Login_Validtion");
const { uploadFile } = require("../middlewares/FileUploads/fileUpload_validation");
const { fetchUser } = require("../controller/login_page");


loginRouter.get("/login", myloginRouter);

loginRouter.post('/login', uploadFile, loginvalidate, checkLoginValidation, fetchUser)

module.exports = {
    loginRouter
}


