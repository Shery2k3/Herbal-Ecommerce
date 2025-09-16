const express = require('express');
const router = express.Router();
const cityController = require("../../controllers/v2/cityController");

// Get all cities
router.get('/all', cityController.getAllCities);

// Create a new city
router.post('/create', cityController.createCity);

// Update city by ID
router.put('/edit/:id', cityController.updateCity);

// Delete city by ID
router.delete('/delete/:id', cityController.deleteCity);

// Get branches with areas by city ID
router.get('/areas/:id?', cityController.getBranchesWithAreasByCityId);

// Get city by ID
router.get('/:id', cityController.getCityById);

module.exports = router;