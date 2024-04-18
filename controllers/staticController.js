const imageModel = require("../models/staticModel");

module.exports = {
    getImage: async (req, res, next) => {
        const { label } = req.params;
        try {
            const image = await imageModel.findOne({ label });
            if (image !== null) {
                res.status(200).json(image);
            } else {
                res.status(404).json({
                    message: `Image not present for label: "${label}" `,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    createImage: async (req, res, next) => {
        const { image, label } = req.body;
        try {
            //! Deny if image already exists
            const existingLabel = await imageModel.findOne({ label });
            if (existingLabel) {
                return res.status(400).json({
                    message:
                        "Label already exists. Please choose a different label.",
                });
            }

            //! Deny if invalid DataURL
            if (!isValidURL(image)) {
                return res.status(400).json({
                    message:
                        "Invalid image format. Please provide a valid data URL.",
                });
            }

            //? Finally create after checks
            const body = await imageModel.create({ label, image });
            res.status(200).json(body);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    getLabels: async (req, res, next) => {
        try {
            const body = await imageModel.distinct("label");
            console.log(12);
            res.status(200).json(body);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    getAll: async (req, res, next) => {
        try {
            const images = await imageModel.find({});
            res.status(200).json(images);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    deleteImage: async (req, res, next) => {
        const { label } = req.params;
        try {
            const image = await imageModel.findOneAndDelete({ label });
            if (image !== null) {
                res.status(200).json({ message: `Image with label: "${label}" deleted successfully.` });
            } else {
                res.status(404).json({ message: `Image not present for label: "${label}" ` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

};

const isValidURL = (dataURL) => {
    return true
};
