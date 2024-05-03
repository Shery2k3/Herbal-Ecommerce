const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: false,
    },
    discount_percentage: {
        type: Number,
        required: false,
    },
    availibility: {
        type: Boolean,
        required: false,
        default: true
    }
})


const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    items: {
        type: [itemSchema],
        required: true
    },
    order: {
        type: Number,
        required: false
    }
})

const Menu = mongoose.model("Menu", categorySchema, "Menu");
module.exports = Menu;
