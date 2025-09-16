const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    deliveryAddress: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: false,
    },
    near: {
        type: String,
        required: false,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    phoneNumAlternate: {
        type: String,
        required: false,
    },
});

const cartItemSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const cartSchema = [cartItemSchema];

const locationSchema = new mongoose.Schema({
    locations: {
        type: [String],
        required: true,
    },
});

const priceSchema = new mongoose.Schema({
    subTotal: {
        type: Number,
        required: false,
    },

    totalPrice: {
        type: Number,
        required: true,
    },

    deliveryCharges: {
        type: Number,
        required: true,
    },
});

const formDataSchema = new mongoose.Schema(
    {
        formValues: customerSchema,
        cart: {
            type: cartSchema,
            required: true,
        },
        localArea: {
            type: [String],
            required: true,
        },
        price: priceSchema,
        orderId: {
            type: Number,
            required: false,
        },
    },
    { timestamps: true }
);

const checkoutForm = mongoose.model(
    "FormData",
    formDataSchema,
    "CheckoutForms"
);

module.exports = checkoutForm;
