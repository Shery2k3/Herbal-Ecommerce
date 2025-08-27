const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");
const { uploadToCloudinary } = require("../middleware/cloudinary");

router.get("/labels", staticController.getLabels);
router.get("/images", staticController.getAll);
router.post("/create", uploadToCloudinary, staticController.createImage);
router.get("/:label", staticController.getImage);
router.delete("/:label", staticController.deleteImage);

module.exports = router;
