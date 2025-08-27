const cloudinary = require('../config/cloudinary');
const multer = require('multer');

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const multerUpload = multer({ storage: storage });

const uploadToCloudinary = async (req, res, next) => {
    try {
        let imageToUpload;

        // Case 1: A file is uploaded (e.g., from a form with <input type="file">)
        if (req.file) {
            // Multer adds the 'file' object to the request. We need to convert the buffer to a base64 string for Cloudinary.
            imageToUpload = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }
        // Case 2: A base64 string is sent in the body (your existing logic)
        else if (req.body.image && req.body.image.startsWith('data:image/')) {
            imageToUpload = req.body.image;
        }

        // If there's an image to upload, upload it
        if (imageToUpload) {
            const uploadResult = await cloudinary.uploader.upload(imageToUpload, {
                folder: 'HoD-test',
                quality: 'auto',
                fetch_format: 'auto'
            });

            // Replace image in body with the new URL and add the ID
            req.body.image = uploadResult.secure_url;
            req.body.cloudinary_public_id = uploadResult.public_id;
        }
        
        // If no new image, just continue
        next();
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({ 
            message: 'Image upload failed', 
            error: error.message 
        });
    }
};

module.exports = {
    multerUpload, // Export the multer middleware
    uploadToCloudinary
};