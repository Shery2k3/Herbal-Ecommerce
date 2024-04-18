const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/blogs", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById)
router.post("/create", blogController.createBlog);
router.put("/edit/:id", blogController.editBlog);
router.delete("/delete/:id", blogController.deleteBlog);

module.exports = router;
