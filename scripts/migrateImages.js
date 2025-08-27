const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const chalk = require('chalk');
const Menu = require('../models/menuModel'); // Adjust the path to your menuModel file
require("dotenv").config();


// --- ⚙️ CONFIGURATION: ENTER YOUR DETAILS HERE ---
const MONGO_URI = process.env.TEST_URI;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
    secure: true,
});
// ----------------------------------------------------

// Helper function for logging
const log = {
    info: (message) => console.log(chalk.blue(message)),
    success: (message) => console.log(chalk.green(message)),
    warn: (message) => console.log(chalk.yellow(message)),
    error: (message) => console.log(chalk.red.bold(message)),
    process: (message) => console.log(chalk.magenta(message)),
};

const migrateImages = async () => {
    log.info('--- Starting Image Migration Script ---');

    try {
        // --- Connect to MongoDB ---
        log.process('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        log.success(`Database '${mongoose.connection.db.databaseName}' connected successfully.`);

        // --- Find all categories ---
        const categories = await Menu.find({});
        log.info(`Found ${categories.length} categories to process.`);

        let totalItemsProcessed = 0;
        let totalImagesUploaded = 0;
        let totalItemsSkipped = 0;

        // --- Loop through each category ---
        for (const category of categories) {
            log.info(`\nProcessing Category: ${chalk.cyan.bold(category.category)}`);
            let categoryNeedsSave = false;

            // --- Loop through each item in the category ---
            for (const item of category.items) {
                totalItemsProcessed++;
                const title = item.title || 'Untitled Item';

                // --- Check if this item needs migration ---
                const isBase64 = item.image && item.image.startsWith('data:image/');
                const alreadyMigrated = !!item.cloudinary_public_id;

                if (alreadyMigrated) {
                    log.warn(`   -> SKIPPING: '${title}' (already has a Cloudinary ID).`);
                    totalItemsSkipped++;
                    continue;
                }

                if (!isBase64) {
                    log.warn(`   -> SKIPPING: '${title}' (image is not a base64 string).`);
                    totalItemsSkipped++;
                    continue;
                }

                // --- Upload to Cloudinary ---
                try {
                    log.process(`   -> UPLOADING: '${title}'...`);
                    const uploadResult = await cloudinary.uploader.upload(item.image, {
                        folder: 'HoD-test',
                        quality: 'auto',
                        fetch_format: 'auto'
                    });

                    // --- Update the item's fields in the document ---
                    item.image = uploadResult.secure_url;
                    item.cloudinary_public_id = uploadResult.public_id;
                    categoryNeedsSave = true; // Mark that this category document needs to be saved
                    totalImagesUploaded++;
                    log.success(`   -> SUCCESS: '${title}' uploaded. New URL: ${uploadResult.secure_url}`);

                } catch (uploadError) {
                    log.error(`   -> FAILED to upload '${title}': ${uploadError.message}`);
                }
            }

            // --- Save the entire category document if any of its items were changed ---
            if (categoryNeedsSave) {
                await category.save();
                log.success(`   Saved updates for category '${category.category}'.`);
            }
        }

        // --- Final Report ---
        console.log('\n' + chalk.blue.bold('--- Migration Complete! ---'));
        log.success(`Total Categories Scanned: ${categories.length}`);
        log.success(`Total Items Processed: ${totalItemsProcessed}`);
        log.info(`Images Uploaded Now: ${totalImagesUploaded}`);
        log.warn(`Items Skipped: ${totalItemsSkipped}`);
        console.log(chalk.blue.bold('-------------------------'));


    } catch (error) {
        log.error(`A critical error occurred: ${error.message}`);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            log.info('Database disconnected.');
        }
    }
};

migrateImages();