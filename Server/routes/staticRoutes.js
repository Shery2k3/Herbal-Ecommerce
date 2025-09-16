const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");
const {
    uploadToCloudinary,
    multerUpload,
} = require("../middleware/cloudinary");
const { isAdmin } = require("../middleware/auth");

router.get("/labels", staticController.getLabels);
router.get("/images", staticController.getAll);
router.post(
    "/create",
    isAdmin,
    multerUpload.single("image"),
    uploadToCloudinary,
    staticController.createImage
);
router.get("/:label", staticController.getImage);
router.delete("/:label", isAdmin, staticController.deleteImage);

module.exports = router;
