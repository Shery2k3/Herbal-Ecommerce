const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String, //* Hashed,
        required: true,
    },
});

const userModel = mongoose.model("Users", userSchema, "Users");

module.exports = userModel;
