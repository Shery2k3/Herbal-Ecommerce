const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/categories", menuController.getAllCategories);
router.get("/all", menuController.getAll);
router.get("/:category", menuController.getItemByCategory);
router.post("/create", menuController.addItem);
router.post("/createcategory", menuController.createCategory);
router.put("/edit/:categoryId/:itemId", menuController.editItem);
router.delete("/delete/:categoryId/:itemId", menuController.deleteItem);

module.exports = router;
