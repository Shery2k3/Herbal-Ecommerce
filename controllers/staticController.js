const imageModel = require("../models/staticModel");
const cloudinary = require("../config/cloudinary");

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
        // Image is now a Cloudinary URL thanks to middleware
        const { image, label, cloudinary_public_id } = req.body;
        try {
            //! Deny if image already exists
            const existingLabel = await imageModel.findOne({ label });
            if (existingLabel) {
                return res.status(400).json({
                    message:
                        "Label already exists. Please choose a different label.",
                });
            }

            //? Finally create after checks (no need for URL validation since it's from Cloudinary)
            const body = await imageModel.create({ 
                label, 
                image, 
                cloudinary_public_id 
            });
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
            // Get the image to delete from Cloudinary first
            const image = await imageModel.findOne({ label });
            if (!image) {
                return res.status(404).json({ message: `Image not present for label: "${label}" ` });
            }

            // Delete from Cloudinary if public_id exists
            if (image.cloudinary_public_id) {
                try {
                    await cloudinary.uploader.destroy(image.cloudinary_public_id);
                } catch (cloudinaryError) {
                    console.error('Error deleting image from Cloudinary:', cloudinaryError);
                    // Continue with database deletion even if Cloudinary deletion fails
                }
            }

            // Delete from database
            await imageModel.findOneAndDelete({ label });
            res.status(200).json({ message: `Image with label: "${label}" deleted successfully.` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

};
