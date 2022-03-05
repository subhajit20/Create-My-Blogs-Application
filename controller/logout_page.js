const createError = require("http-errors");

function myLogOut(req, res, next) {
    try {
        res.clearCookie("MyBlog");
        res.status(200).redirect("/login")
    } catch (err) {
        next(createError("Invalid credentials"))
    }
}

module.exports = {
    myLogOut
}