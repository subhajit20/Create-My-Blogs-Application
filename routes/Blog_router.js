const express = require("express");
/**
 * Internal Imports
 */
const { getBlogPage, getAllBlogs, addBlog, allBlogPage, deleteBlog } = require("../controller/Blog_models")
const { uploadFile } = require("../middlewares/FileUploads/fileUpload_validation");
const { validation, checkValidation } = require("../middlewares/post_blog_validation/blog_post_validate");

const { myAuthGuard } = require("../middlewares/AuthGuard/AuthGuard");

const blogRouter = express.Router();


blogRouter.get("/home", myAuthGuard, getBlogPage);

blogRouter.get("/allBlog", myAuthGuard, getAllBlogs);

blogRouter.get("/all", myAuthGuard, allBlogPage);

blogRouter.get("/del/:id", myAuthGuard, deleteBlog);

blogRouter.post("/submit", myAuthGuard, uploadFile, validation, checkValidation, addBlog);

module.exports = {
    blogRouter
}