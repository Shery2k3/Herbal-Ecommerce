const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const { isAdmin } = require("../middleware/auth");

router.get("/isOpen/:area", branchController.isOpenArea);
router.get("/isOpen", branchController.isOpen);
router.get("/all", branchController.getAll);
router.get("/branches", branchController.getBranches);
router.post("/create", isAdmin, branchController.create);
router.put("/edit/:branch", isAdmin, branchController.update);
router.delete("/delete/:branch", isAdmin, branchController.delete);
router.get("/email/:area", branchController.getEmail);

module.exports = router;
