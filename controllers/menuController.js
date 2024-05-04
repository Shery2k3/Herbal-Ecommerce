const Menu = require("../models/menuModel");

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            //? Deconstructs then groups after sorting by "order"
            const categories = await Menu.aggregate([
                { $unwind: "$items" },
                { $sort: { "items.order": 1 } },
                { $group: { _id: "$category", order: { $first: "$order" } } },
                { $sort: { order: 1 } },
            ]);

            //? Cleaning the Data
            const data = categories.map((item) => item._id);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    getItemByCategory: async (req, res, next) => {
        const { category } = req.params;
        try {
            const items = await Menu.find({ category });
            res.status(200).json(items);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    addItem: async (req, res, next) => {
        const { category, image, title, description, price, discount_percentage } = req.body;
        const old_price = price;
        const new_price = old_price - (old_price * (discount_percentage / 100));
        const roundedPrice = Math.floor(new_price / 10) * 10 + 9; // round the new price to the nearest 9

        try {
            let menu = await Menu.findOne({ category });
    
            //? Creates category if its not present
            if (!menu) {
                menu = new Menu({ category, items: [] });
            }
    
            menu.items.push({ title, image, description, old_price, price: roundedPrice, discount_percentage });
            await menu.save();
            res.status(200).json(menu);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    getAll: async (req, res, next) => {
        try {
            const body = await Menu.find().lean();
            res.status(200).json(body);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    editItem: async (req, res, next) => {
        console.log(req.params);
        const { categoryId, itemId } = req.params;
        /*
         "price" in req.body is the old price of the item, new price will be calculated after applying the discount. 
        */
        const { title, image, description, price, discount_percentage } = req.body;
        const old_price = price;
        const new_price = old_price - (old_price * (discount_percentage / 100)); 
        const roundedPrice = Math.floor(new_price / 10) * 10 + 9; // round the new price to the nearest 9
    
        try {
            // Use findByIdAndUpdate to update the specific item
            const updatedCategory = await Menu.findByIdAndUpdate(
                categoryId,
                {
                    $set: {
                        "items.$[item].title": title,
                        "items.$[item].image": image,
                        "items.$[item].description": description,
                        "items.$[item].old_price": old_price,
                        "items.$[item].price": roundedPrice,
                        "items.$[item].discount_percentage": discount_percentage,
                    },
                },
                {
                    arrayFilters: [{ "item._id": itemId }],
                    new: true, // Return the updated document
                }
            );
    
            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
    
            res.status(200).json(updatedCategory);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    deleteItem: async (req, res, next) => {
        const { categoryId, itemId } = req.params;

        try {
            const updatedCategory = await Menu.findByIdAndUpdate(
                categoryId,
                { $pull: { items: { _id: itemId } } },
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }

            res.status(200).json(updatedCategory);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    createCategory: async (req, res) => {
        const { category, order } = req.body;
    
        try {
            let newOrder;
    
            if (order) {
                newOrder = order;
            } else {
                const highestOrderCategory = await Menu.find().sort({ order: -1 }).limit(1);
                newOrder = highestOrderCategory[0]?.order + 1 || 801;
            }
    
            const newCategory = new Menu({
                category,
                items: [],
                order: newOrder
            });
    
            const savedCategory = await newCategory.save();
    
            res.status(201).json(savedCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
