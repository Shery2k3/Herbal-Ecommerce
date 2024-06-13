const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true
    },
    
    openingTime: {
        type: String,
        required: true
    },
    
    closingTime: {
        type: String,
        required: true
    }
});

const timeModel = mongoose.model("Time", timeSchema, "Time");
module.exports = timeModel;