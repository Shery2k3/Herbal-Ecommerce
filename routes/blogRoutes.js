const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const {
    uploadToCloudinary,
    multerUpload,
} = require("../middleware/cloudinary");
const { isAdmin } = require("../middleware/auth");

router.get("/blogs", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.post(
    "/create",
    isAdmin,
    multerUpload.single("image"),
    uploadToCloudinary,
    blogController.createBlog
);
router.put(
    "/edit/:id",
    isAdmin,
    multerUpload.single("image"),
    uploadToCloudinary,
    blogController.editBlog
);
router.delete("/delete/:id", isAdmin, blogController.deleteBlog);

module.exports = router;
