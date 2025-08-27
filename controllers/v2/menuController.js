const Menu = require("../../models/menuModel.js"); // Adjust path to your model

// @desc    Get all menu categories for a specific city
// @route   GET /api/v2/menu/categories/:city
// @access  Public
const getAllCategoriesByCity = async (req, res) => {
    try {
        const { city } = req.params;

        // Make the query case-insensitive
        const categories = await Menu.find({
            city: city,
        });

        if (categories.length === 0) {
            return res.status(404).json({
                message: `No menu categories found for city: ${city}`,
            });
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

        const category = await Menu.findOne({
            city: city,
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

// @desc    Get all items for a specific city
// @route   GET /api/v2/menu/items/:city
// @access  Public
const getAllItemsByCity = async (req, res) => {
    try {
        const { city } = req.params;

        // This is an aggregation pipeline. It's a powerful way to process data.
        const items = await Menu.aggregate([
            // Stage 1: Match all categories for the specified city (case-insensitive)
            { $match: { city: city } },

            // Stage 2: Deconstruct the items array field from the input documents to output a document for each element.
            { $unwind: "$items" },

            // Stage 3: Replace the document with just the item sub-document.
            { $replaceRoot: { newRoot: "$items" } },
        ]);

        if (items.length === 0) {
            return res
                .status(404)
                .json({ message: `No items found for city: ${city}` });
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
