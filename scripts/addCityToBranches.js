const mongoose = require("mongoose");
const Branches = require("../models/branchModel"); // Ensure this path is correct

const MONGO_URI =
    "MONGO_URI";

const migrateData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(
            `Database '${mongoose.connection.db.databaseName}' connected successfully. Sending update command...`
        );

        // A single, powerful command to update all categories
        const result = await Branches.updateMany(
            { city: { $exists: false } }, // The Query: Find all categories that don't have a city
            { $set: { city: "68aef8dd37ddd06e6a3c5775" } } // The Update: Set the city field to "Karachi"
        );

        console.log("\n----------------------------------------");
        console.log("Migration Command Sent!");
        console.log(
            `Matched ${result.matchedCount} categories that needed a city.`
        );
        console.log(`Modified ${result.modifiedCount} categories.`);
        console.log("----------------------------------------");
    } catch (error) {
        console.error("An error occurred during migration:", error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log("Database disconnected.");
        }
    }
};

migrateData();
