const express = require("express");
const messageController = require("../controllers/messageController");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/create", isAdmin, messageController.createMessage);
router.get("/get", messageController.getMessage);
router.put("/edit", isAdmin, messageController.updateMessage);
router.delete("/delete", isAdmin, messageController.deleteMessage);

module.exports = router;
