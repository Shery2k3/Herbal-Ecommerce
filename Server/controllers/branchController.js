const branchModel = require("../models/branchModel");
const deliveryModel = require("../models/deliveryModel");
const moment = require("moment-timezone");

module.exports = {
    isOpen: async (req, res, next) => {
        try {
            // const storeTimes = await branchModel.findOne({
            //     branch: "global"
            // });
            // if (!storeTimes) {
            //     return res
            //         .status(404)
            //         .json({ message: "Store times not found" });
            // }

            // const currentTime = moment().utc();
            // const openingTime = moment.utc(storeTimes.openingTime).set({ year: currentTime.year(), month: currentTime.month(), date: currentTime.date() });
            // const closingTime = moment.utc(storeTimes.closingTime).set({ year: currentTime.year(), month: currentTime.month(), date: currentTime.date() });

            // console.log("Current Time: ", currentTime.format());
            // console.log("Opening Time: ", openingTime.format());
            // console.log("Closing Time: ", closingTime.format());

            // if (closingTime.isBefore(openingTime)) {
            //     closingTime.add(1, 'days');
            // }

            // if (currentTime.isSameOrAfter(openingTime) && currentTime.isBefore(closingTime)) {
            //     console.log("isOpen: true");
            //     return res.status(200).json({ isOpen: true });
            // } else {
            //     console.log("isOpen: false");
            //     return res.status(200).json({ isOpen: false });
            // }
            return res.status(200).json({ isOpen: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    //? Utilizing UTC time for consistency
    isOpenArea: async (req, res, next) => {
        try {
            // let { area } = req.params;
            // console.log("Area before split: ", area);
            // area = area.split(',')[0].trim();
            // console.log("Area after split: ", area);

            // let branchName;

            // const deliveryArea = await deliveryModel.findOne({ value: new RegExp(`^${area}$`, 'i') });

            // if (!deliveryArea) {
            //     return res.status(404).json({ message: "Area not found" });
            // }

            // if (!deliveryArea.branch) {
            //     branchName = "global";
            // }
            // else {
            //     branchName = deliveryArea.branch;
            // }

            // let storeTimes = await branchModel.findOne({ branch: new RegExp(`^${branchName}$`, 'i') });

            // // If openingTime or closingTime for the specific branch are not found, use the global branch's store times
            // if (!storeTimes || !storeTimes.openingTime || !storeTimes.closingTime) {
            //     storeTimes = await branchModel.findOne({ branch: "global" });
            // }

            // console.log(branchName);
            // const currentTime = moment().utc();
            // const openingTime = moment.utc(storeTimes.openingTime).set({ year: currentTime.year(), month: currentTime.month(), date: currentTime.date() });
            // const closingTime = moment.utc(storeTimes.closingTime).set({ year: currentTime.year(), month: currentTime.month(), date: currentTime.date() });

            // console.log("Current Time: ", currentTime.format());
            // console.log("Opening Time: ", openingTime.format());
            // console.log("Closing Time: ", closingTime.format());

            // if (closingTime.isBefore(openingTime)) {
            //     closingTime.add(1, 'days');
            // }

            // if (currentTime.isSameOrAfter(openingTime) && currentTime.isBefore(closingTime)) {
            //     console.log("isOpen: true");
            //     return res.status(200).json({ isOpen: true });
            // } else {
            //     console.log("isOpen: false");
            //     return res.status(200).json({ isOpen: false });
            // }
            return res.status(200).json({ isOpen: true });
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
