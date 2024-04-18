const checkoutModel = require("../models/checkoutModel");

module.exports = {
    getAllForms: async (req, res, next) => {
        try {
            const forms = await checkoutModel
            .find()
            .sort({ _id: -1 });
            res.status(200).json(forms);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    },
    lastForm: async (req, res, next) => {
        try {
            const form = await checkoutModel
            .find()
            .sort({ _id: -1 }) //? Sort by creation date in descending order
            .limit(1); 
            res.status(200).json(form);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    },
    createForm: async (req, res, next) => {
        try {
            const body = req.body;
            const lastForm = await checkoutModel
            .findOne()
            .sort({ _id: -1 });
    
            //* Increments Order ID by 1 if exists, else orderId = 804
            if (lastForm && lastForm.orderId) {
                body.orderId = lastForm.orderId + 1;
            } else {
                body.orderId = 804;
            }
    
            //? Remove image field
            body.cart.forEach(item => {
                delete item.image;
            });
    
            const form = await checkoutModel.create(body);
            res.status(200).json(form);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    },
};
