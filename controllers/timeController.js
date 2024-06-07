const timeModel = require("../models/timeModel");
const deliveryModel = require("../models/deliveryModel");
const moment = require("moment-timezone");

module.exports = {
    isOpen: async (req, res, next) => {
        try {
            const storeTimes = await timeModel.findOne({
                branch: "global"
            });
            if (!storeTimes) {
                return res
                    .status(404)
                    .json({ message: "Store times not found" });
            }

            const currentTime = new Date();
            const openingTime = moment().tz("Asia/Karachi").set({
                hour: storeTimes.openingTime.split(":")[0],
                minute: storeTimes.openingTime.split(":")[1],
                second: 0
            });
            const closingTime = moment().tz("Asia/Karachi").set({
                hour: storeTimes.closingTime.split(":")[0],
                minute: storeTimes.closingTime.split(":")[1],
                second: 0
            });

            //* Debugging time logs
            console.log("Current Time: ", currentTime.toISOString());
            console.log("Opening Time: ", openingTime.toISOString());
            console.log("Closing Time: ", closingTime.toISOString());

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

    isOpenArea: async (req, res, next) => {
        try {
            let { area } = req.params;
            let branchName;

            const deliveryArea = await deliveryModel.findOne({ value: new RegExp(`^${area}$`, 'i') });
            if (!deliveryArea) {
                return res.status(404).json({ message: "Area not found" });
            }

            branchName = deliveryArea.branch;

            const storeTimes = await timeModel.findOne({ branch: new RegExp(`^${branchName}$`, 'i') });
            if (!storeTimes) {
                return res.status(404).json({ message: "Branch not found" });
            }

            const currentTime = new Date();
            const openingTime = moment().tz("Asia/Karachi").set({
                hour: storeTimes.openingTime.split(":")[0],
                minute: storeTimes.openingTime.split(":")[1],
                second: 0
            });
            const closingTime = moment().tz("Asia/Karachi").set({
                hour: storeTimes.closingTime.split(":")[0],
                minute: storeTimes.closingTime.split(":")[1],
                second: 0
            });

            //* Debugging time logs
            console.log("Current Time: ", currentTime.toISOString());
            console.log("Opening Time: ", openingTime.toISOString());
            console.log("Closing Time: ", closingTime.toISOString());

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
