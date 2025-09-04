const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const Menu = require("../models/menuModel");
const {
    uploadToCloudinary,
    multerUpload,
} = require("../middleware/cloudinary");
const { isAdmin } = require("../middleware/auth");

router.get("/categories", menuController.getAllCategories);
router.get("/all", menuController.getAll);
router.get("/:category", menuController.getItemByCategory);
router.post(
    "/create",
    isAdmin,
    multerUpload.single("image"),
    uploadToCloudinary,
    menuController.addItem
);
router.post("/createcategory", isAdmin, menuController.createCategory);
router.put(
    "/edit/:categoryId/:itemId",
    isAdmin,
    multerUpload.single("image"),
    uploadToCloudinary,
    menuController.editItem
);
router.delete(
    "/delete/:categoryId/:itemId",
    isAdmin,
    menuController.deleteItem
);

//? Custom Script
router.put("/updateItems", isAdmin, async (req, res) => {
    try {
        const menus = await Menu.find({});

        for (let menu of menus) {
            if (menu.category === "Assorted Box" || menu.category === "Sides")
                continue;
            console.log(menu.category);
            for (let item of menu.items) {
                let price = item.price;
                let old_price = item.old_price;
                item.old_price = price;
                item.price = Math.round((old_price * 0.85) / 10) * 10 - 1;
                item.discount_percentage = 15;

                // item.price = item.old_price;
            }

            await menu.save();
        }

        res.status(200).json({ message: "Items updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
