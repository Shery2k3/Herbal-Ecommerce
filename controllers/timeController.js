const timeModel = require("../models/timeModel");

module.exports = {
    isOpen: async (req, res, next) => {
        try {
            const storeTimes = await timeModel.findOne();
            if (!storeTimes) {
                return res
                    .status(404)
                    .json({ message: "Store times not found" });
            }

            const currentTime = new Date();
            const openingTime = new Date();
            openingTime.setHours(
                storeTimes.openingTime.split(":")[0],
                storeTimes.openingTime.split(":")[1]
            );
            const closingTime = new Date();
            closingTime.setHours(
                storeTimes.closingTime.split(":")[0],
                storeTimes.closingTime.split(":")[1]
            );

            if (closingTime < openingTime) {
                // If closing time is on the next day
                if (currentTime < closingTime || currentTime >= openingTime) {
                    return res.status(200).json({ isOpen: true });
                } else {
                    return res.status(200).json({ isOpen: false });
                }
            } else {
                // If closing time is on the same day
                if (currentTime >= openingTime && currentTime <= closingTime) {
                    return res.status(200).json({ isOpen: true });
                } else {
                    return res.status(200).json({ isOpen: false });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;
            const response = await timeModel.create(body);
            res.status(201).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
};
