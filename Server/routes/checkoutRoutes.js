const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/create", checkoutController.createForm);
router.get("/last", checkoutController.lastForm);
router.get("/forms", checkoutController.getAllForms)
module.exports = router;
