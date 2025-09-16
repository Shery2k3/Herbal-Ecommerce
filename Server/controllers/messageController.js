const Message = require("../models/messageModel");

module.exports = {
    createMessage: async (req, res, next) => {
        let message = await Message.findOne();
        if (message) {
            return res.status(409).json({"error": "Message already exists"});
        }
        message = await Message.create(req.body);
        res.json(message);
    },

    getMessage: async (req, res, next) => {
        const message = await Message.findOne();
        res.json(message);
    },

    updateMessage: async (req, res, next) => {
        const { text } = req.body;
        const message = await Message.findOneAndUpdate(
            {},
            { text },
            { new: true }
        );
        res.json(message);
    },

    deleteMessage: async (req, res, next) => {
        await Message.deleteOne();
        res.json({ message: "Message deleted" });
    },
};
