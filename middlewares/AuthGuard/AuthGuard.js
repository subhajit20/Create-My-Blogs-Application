/*********************** External Imports ***********************************/
const { cookie } = require("express-validator");
const jwt = require("jsonwebtoken");

function myAuthGuard(req, res, next) {
    try {
        const cookies = req.signedCookies;
        const isValidCookies = jwt.verify(cookies[process.env.COOKIE_NAME], process.env.SECRET_KEY)
        const { id, username, email } = isValidCookies;
        req.id = id;
        req.username = username;
        req.email = email;
        next()
    } catch (err) {
        res.status(500).redirect("/login")
    }
}

module.exports = {
    myAuthGuard
}