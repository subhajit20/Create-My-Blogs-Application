const express = require("express");
const logOutRouter = express.Router();

/************** Logout middleware *********************/
const { myLogOut } = require("../controller/logout_page")

logOutRouter.get("/logout", myLogOut)


module.exports = {
    logOutRouter
}