const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const {
    uploadToCloudinary,
    multerUpload,
} = require("../middleware/cloudinary");

router.get("/blogs", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/create", multerUpload.single("image"), uploadToCloudinary, blogController.createBlog);
router.put("/edit/:id", multerUpload.single("image"), uploadToCloudinary, blogController.editBlog);
router.delete("/delete/:id", blogController.deleteBlog);

module.exports = router;
