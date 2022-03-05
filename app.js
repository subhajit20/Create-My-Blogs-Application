//External exports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const app = express();


//internal exports
const { blogRouter } = require("./routes/Blog_router");
const { signuproutes } = require("./routes/SignupRoute");
const { loginRouter } = require('./routes/login');

const { logOutRouter } = require("./routes/Logout");

const PORT = process.env.PORT || 4001;

const public_folder = path.join(__dirname, "./public");
const views_folder = path.join(__dirname, "./views")

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connection is succesfully done...");
    })
    .catch(() => {
        console.log("Connection is not done yet...")
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(public_folder));

app.set("view engine", "ejs");
app.set("views", views_folder)

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

/**
 * ********************************Blog Page route**********************************
 */
app.use(blogRouter);

/**
 * ********************************Signup Page route**********************************
 */
app.use(signuproutes);

/**
 * ********************************Login Page route**********************************
 */
app.use(loginRouter);

/**
 * ********************************Logout Page route**********************************
 */
app.use(logOutRouter);


app.use((req, res) => {
    res.status(200).render("Error", {
        title: "404 Error"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/home`);
})