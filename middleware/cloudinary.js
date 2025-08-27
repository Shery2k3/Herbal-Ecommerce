const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (req, res, next) => {
    try {
        // Check if image field exists in request body
        if (req.body.image && req.body.image.startsWith('data:image/')) {
            // Upload base64 image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(req.body.image, {
                folder: 'HoD-test', // Optional: organize images in folders
                quality: 'auto',
                fetch_format: 'auto'
            });

            // Replace base64 with Cloudinary URL
            req.body.image = uploadResult.secure_url;
            
            // Optional: Store public_id for future deletions
            req.body.cloudinary_public_id = uploadResult.public_id;
        }
        
        next();
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({ 
            message: 'Image upload failed', 
            error: error.message 
        });
    }
};

module.exports = { uploadToCloudinary };