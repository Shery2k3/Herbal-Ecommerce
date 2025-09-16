const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
});

const City = mongoose.model("City", citySchema, "Cities");
module.exports = City;