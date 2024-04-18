const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/create", messageController.createMessage);
router.get("/get", messageController.getMessage);
router.put("/edit", messageController.updateMessage);
router.delete("/delete", messageController.deleteMessage);

module.exports = router;
