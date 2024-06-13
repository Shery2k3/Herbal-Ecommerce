const branchModel = require("../models/branchModel");
const deliveryModel = require("../models/deliveryModel");
const moment = require("moment-timezone");

module.exports = {
    isOpen: async (req, res, next) => {
        try {
            const storeTimes = await branchModel.findOne({
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
            area = area.split(',')[0].trim();


            let branchName;

            const deliveryArea = await deliveryModel.findOne({ value: new RegExp(`^${area}$`, 'i') });

            if (!deliveryArea) {
                return res.status(404).json({ message: "Area not found" });
            }

            if (!deliveryArea.branch) {
                branchName = "global";
            }
            else {
                branchName = deliveryArea.branch;
            }

            const storeTimes = await branchModel.findOne({ branch: new RegExp(`^${branchName}$`, 'i') });

            console.log(branchName);
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
            const response = await branchModel.create(body);
            res.status(201).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res, next) => {
        try {
            const { branch } = req.params;
            const body = req.body;
            const response = await branchModel.findOneAndUpdate({branch: branch}, body, { new: true });
            if (!response) {
                return res.status(404).json({ message: "Branch not found" });
            }
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    
    delete: async (req, res, next) => {
        try {
            const { branch } = req.params;
            const response = await branchModel.findOneAndDelete({branch: branch});
            if (!response) {
                return res.status(404).json({ message: "Branch not found" });
            }
            res.status(200).json({ message: "Branch deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    getBranches: async (req, res, next) => {
        try {
            const branches = await branchModel.find({}, 'branch');
            const branchNames = branches.map(branch => branch.branch);
            res.status(200).json(branchNames);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    
    getAll: async (req, res, next) => {
        try {
            const branches = await branchModel.find({});
            res.status(200).json(branches);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
};
