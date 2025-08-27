const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true,
    },

    openingTime: {
        type: String,
        required: true,
    },

    closingTime: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        required: true,
    },
});

const timeModel = mongoose.model("Time", timeSchema, "Time");
module.exports = timeModel;
