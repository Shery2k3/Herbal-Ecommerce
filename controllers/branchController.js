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

            const currentTime = moment().tz("Asia/Karachi");
            const openingTime = moment(storeTimes.openingTime).tz("Asia/Karachi");
            const closingTime = moment(storeTimes.closingTime).tz("Asia/Karachi");

            //* Debugging time logs
            console.log("Current Time: ", currentTime.toISOString());
            console.log("Opening Time: ", openingTime.toISOString());
            console.log("Closing Time: ", closingTime.toISOString());

            if (closingTime.isBefore(openingTime)) {
                // If closing time is on the next day
                if (currentTime.isBefore(closingTime) || currentTime.isSameOrAfter(openingTime)) {
                    return res.status(200).json({ isOpen: true });
                } else {
                    return res.status(200).json({ isOpen: false });
                }
            } else {
                // If closing time is on the same day
                if (currentTime.isSameOrAfter(openingTime) && currentTime.isSameOrBefore(closingTime)) {
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

            let storeTimes = await branchModel.findOne({ branch: new RegExp(`^${branchName}$`, 'i') });

            // If openingTime or closingTime for the specific branch are not found, use the global branch's store times
            if (!storeTimes || !storeTimes.openingTime || !storeTimes.closingTime) {
                storeTimes = await branchModel.findOne({ branch: "global" });
            }

            console.log(branchName);
            const currentTime = moment().tz("Asia/Karachi");
            const openingTime = moment(storeTimes.openingTime).tz("Asia/Karachi");
            const closingTime = moment(storeTimes.closingTime).tz("Asia/Karachi");

            //* Debugging time logs
            console.log("Current Time: ", currentTime.toISOString());
            console.log("Opening Time: ", openingTime.toISOString());
            console.log("Closing Time: ", closingTime.toISOString());

            // if (closingTime.isBefore(openingTime)) {
            //     // If closing time is on the next day
            //     if (currentTime.isBefore(closingTime) || currentTime.isSameOrAfter(openingTime)) {
            //         console.log("isOpen: true");
            //         return res.status(200).json({ isOpen: true });
            //     } else {
            //         console.log("isOpen: false");
            //         return res.status(200).json({ isOpen: false });
            //     }
            // } else {
            //     // If closing time is on the same day
            //     if (currentTime.isSameOrAfter(openingTime) && currentTime.isSameOrBefore(closingTime)) {
            //         console.log("isOpen: true");
            //         return res.status(200).json({ isOpen: true });
            //     } else {
            //         console.log("isOpen: false");
            //         return res.status(200).json({ isOpen: false });
            //     }
            // }
            if (closingTime.isBefore(openingTime)) {
                // If closing time is on the next day
                if (currentTime.isBefore(closingTime.add(1, 'days')) && currentTime.isSameOrAfter(openingTime)) {
                    console.log("isOpen: true");
                    return res.status(200).json({ isOpen: true });
                } else {
                    console.log("isOpen: false");
                    return res.status(200).json({ isOpen: false });
                }
            } else {
                // If closing time is on the same day
                if (currentTime.isSameOrAfter(openingTime) && currentTime.isSameOrBefore(closingTime)) {
                    console.log("isOpen: true");
                    return res.status(200).json({ isOpen: true });
                } else {
                    console.log("isOpen: false");
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
            const existingBranch = await branchModel.findOne({ branch: body.branch });
            if (existingBranch) {
                return res.status(400).json({ message: "Branch name already exists" });
            }
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
            const existingBranch = await branchModel.findOne({ branch: body.branch });
            if (existingBranch && existingBranch.branch !== branch) {
                return res.status(400).json({ message: "Branch name already exists" });
            }
            const response = await branchModel.findOneAndUpdate({ branch: branch }, body, { new: true });
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
            const response = await branchModel.findOneAndDelete({ branch: branch });
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
    },

    getEmail: async (req, res, next) => {
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
    
            let branchDetails = await branchModel.findOne({ branch: new RegExp(`^${branchName}$`, 'i') });
    
            // If email for the specific branch is not found, use the global branch's email
            if (!branchDetails || !branchDetails.email) {
                branchDetails = await branchModel.findOne({ branch: "global" });
            }
    
            if (!branchDetails || !branchDetails.email) {
                return res.status(404).json({ message: "Email not found" });
            }
    
            return res.status(200).json({ email: branchDetails.email });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
};
