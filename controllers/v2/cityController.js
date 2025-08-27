const City = require("../../models/cityModel");
const Branch = require("../../models/branchModel");
const Delivery = require("../../models/deliveryModel");

// Get all cities
exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find({});
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get city by ID
exports.getCityById = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Create a new city
exports.createCity = async (req, res) => {
    try {
        let { name, code } = req.body;
        name = name.trim().toLowerCase();
        code = code.trim().toUpperCase();
        const newCity = await City.create({ name, code });
        res.status(201).json(newCity);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update city by ID
exports.updateCity = async (req, res) => {
    try {
        let { name, code } = req.body;
        name = name.trim().toLowerCase();
        code = code.trim().toUpperCase();
        const updatedCity = await City.findByIdAndUpdate(
            req.params.id,
            { name, code },
            { new: true }
        );
        if (!updatedCity) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json(updatedCity);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete city by ID
exports.deleteCity = async (req, res) => {
    try {
        const deletedCity = await City.findByIdAndDelete(req.params.id);
        if (!deletedCity) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json({ message: "City deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Areas by City ID
exports.getBranchesWithAreasByCityId = async (req, res) => {
    try {
        const cityId = req.params.id;

        // Find all branches for the given cityId
        const branches = await Branch.find({ city: cityId });

        if (!branches || branches.length === 0) {
            return res.status(404).json({ message: "No branches found for this city" });
        }

        // For each branch, find matching areas from deliveryModel
        const result = await Promise.all(branches.map(async (branch) => {
            const areas = await Delivery.find({ branch: branch.branch }, { value: 1, children: 1, charges: 1, label: 1 });  // Get area values (value field)
            return {
                branch: branch.branch,
                areas: areas.map(area => ({
                    value: area.value,
                    children: area.children || [],
                    charges: area.charges,
                    label: area.label
                })) 
            };
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
