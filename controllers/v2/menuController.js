const Menu = require("../../models/menuModel.js"); // Adjust path to your model
const mongoose = require("mongoose");

// @desc    Get all menu categories for a specific city or all categories if no city specified
// @route   GET /api/v2/menu/categories/:city? (city is optional)
// @access  Public
const getAllCategoriesByCity = async (req, res) => {
    try {
        const { city } = req.params;

        // Build the query - if city is provided, filter by city
        let query = {};
        if (city) {
            // Convert string to ObjectId if it's a valid ObjectId
            if (mongoose.Types.ObjectId.isValid(city)) {
                query.city = new mongoose.Types.ObjectId(city);
            } else {
                query.city = city; // Keep as string for backward compatibility
            }
        }
        
        const categories = await Menu.find(query);

        if (categories.length === 0) {
            const message = city 
                ? `No menu categories found for city: ${city}`
                : "No menu categories found";
            return res.status(404).json({ message });
        }

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get a single category by name for a specific city
// @route   GET /api/v2/menu/categories/:city/:categoryName
// @access  Public
const getCategoryByNameAndCity = async (req, res) => {
    try {
        const { city, categoryName } = req.params;

        // Convert city to ObjectId if it's a valid ObjectId
        let cityQuery = city;
        if (mongoose.Types.ObjectId.isValid(city)) {
            cityQuery = new mongoose.Types.ObjectId(city);
        }

        const category = await Menu.findOne({
            city: cityQuery,
            category: new RegExp(`^${categoryName}$`, "i"),
        });

        if (!category) {
            return res.status(404).json({
                message: `Category '${categoryName}' not found in city: ${city}`,
            });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get all items for a specific city or all items if no city specified
// @route   GET /api/v2/menu/items/:city? (city is optional)
// @access  Public
const getAllItemsByCity = async (req, res) => {
    try {
        const { city } = req.params;

        // Build the aggregation pipeline
        const pipeline = [];

        // Stage 1: Match categories - if city is provided, filter by city
        if (city) {
            // Convert string to ObjectId if it's a valid ObjectId
            let cityQuery = city;
            if (mongoose.Types.ObjectId.isValid(city)) {
                cityQuery = new mongoose.Types.ObjectId(city);
            }
            pipeline.push({ $match: { city: cityQuery } });
        }

        // Stage 2: Deconstruct the items array field from the input documents to output a document for each element.
        pipeline.push({ $unwind: "$items" });

        // Stage 3: Replace the document with just the item sub-document.
        pipeline.push({ $replaceRoot: { newRoot: "$items" } });

        // Execute the aggregation pipeline
        const items = await Menu.aggregate(pipeline);

        if (items.length === 0) {
            const message = city 
                ? `No items found for city: ${city}` 
                : "No items found in the menu";
            return res.status(404).json({ message });
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    getAllCategoriesByCity,
    getCategoryByNameAndCity,
    getAllItemsByCity,
};
