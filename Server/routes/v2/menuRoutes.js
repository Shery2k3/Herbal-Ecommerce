const express = require('express');
const router = express.Router();
const {
    getAllCategoriesByCity,
    getCategoryByNameAndCity,
    getAllItemsByCity
} = require('../../controllers/v2/menuController.js'); // Point to the new v2 controller

// Route to get a specific category for a city
// e.g., /v2/menu/categories/Karachi/Deals
router.get('/categories/:city/:categoryName', getCategoryByNameAndCity);

// Route to get all categories for a city (or all categories if no city specified)
// e.g., /v2/menu/categories/Karachi or /v2/menu/categories
router.get('/categories/:city?', getAllCategoriesByCity);

// Route to get a flat list of all items for a city (or all items if no city specified)
// e.g., /v2/menu/items/Karachi or /v2/menu/items
router.get('/items/:city?', getAllItemsByCity);

module.exports = router;