const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    charges: {
        type: Number,
        required: true,
    },
});

const locationSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    children: [childSchema],
    charges: {
        type: Number,
        required: function () {
            return !this.children || this.children.length === 0;
        },
    },
    branch: {
        type: String,
        required: false,
    },
});
const Delivery = mongoose.model("Delivery", locationSchema, "Delivery");

module.exports = Delivery;
