const { blog_post } = require("../schemas/post_blog_schema");
const mongoose = require("mongoose");

const Blog = new mongoose.model("blog", blog_post)

/*****   Internal Imports  ***********/
const { sign_up } = require("../schemas/Signup_schema");

/************************** User Schema model*******************/
const User = new mongoose.model("signupuser", sign_up);

function getBlogPage(req, res) {
    res.render("Components/Blog_Page");
}

async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find({ user: req.id });
        res.status(200).json({
            data: blogs
        })
    } catch (err) {
        res.status(500).json({
            error: {
                msg: "No blogs are creatd"
            }
        })
    }
}

async function deleteBlog(req, res) {
    try {
        const blogs = await Blog.deleteOne({ _id: req.params.id });
        console.log(blogs);
        res.status(200).redirect("/all");
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: {
                msg: "Not deleted blog"
            }
        })
    }
}

async function allBlogPage(req, res) {
    try {
        res.status(200).render("AllBlogs")
    } catch (err) {
        res.status(500).json({
            error: {
                msg: "No blogs are creatd"
            }
        })
    }
}

async function addBlog(req, res) {
    try {

        const blog = new Blog({ ...req.body, user: req.id })
        const saveBlog = await blog.save();
        const userBlog = await User.updateOne({ _id: req.id }, {
            $push: {
                blogs: saveBlog
            }
        })
        if (saveBlog && userBlog) {

            res.status(200).json({
                successfull: {
                    msg: "Blog is uploaded successfully"
                }
            })
        } else {
            res.status(500).json({
                errors: {
                    msg: "Invalid credentials"
                }
            })
        }


    } catch (err) {
        console.log(err)
        res.status(404).json({
            error: "Blog is not saved"
        })
    }
}

module.exports = {
    addBlog, getBlogPage, getAllBlogs, allBlogPage, deleteBlog
}