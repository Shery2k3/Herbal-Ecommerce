const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");
const { isAdmin } = require("../middleware/auth");

router.get("/locations", deliveryController.getAllLocations);
router.get("/all", deliveryController.getAll);
router.get("/charges/:location", deliveryController.getCharges);
router.post("/create", isAdmin, deliveryController.createLocation);
router.put("/update/:id", isAdmin, deliveryController.updateLocation);
router.delete("/delete/:id", isAdmin, deliveryController.deleteLocation);
//? For Children
router.post("/create/:id/child", isAdmin, deliveryController.addChildLocation);
router.put(
    "/update/:id/child/:childId",
    isAdmin,
    deliveryController.updateChildLocation
);
router.delete(
    "/delete/:id/child/:childId",
    isAdmin,
    deliveryController.deleteChildLocation
);

module.exports = router;
