const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true
    }
});

const imageModel = mongoose.model("Images", imageSchema, "Images");
module.exports = imageModel;
