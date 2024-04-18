const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");

router.get("/locations", deliveryController.getAllLocations);
router.get("/all", deliveryController.getAll);
router.get("/charges/:location", deliveryController.getCharges);
router.post("/create", deliveryController.createLocation);
router.put("/update/:id", deliveryController.updateLocation);
router.delete("/delete/:id", deliveryController.deleteLocation);
//? For Children
router.post("/create/:id/child", deliveryController.addChildLocation);
router.put("/update/:id/child/:childId", deliveryController.updateChildLocation);
router.delete("/delete/:id/child/:childId", deliveryController.deleteChildLocation);

module.exports = router;