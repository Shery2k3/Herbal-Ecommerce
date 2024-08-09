const deliveryModel = require("../models/deliveryModel");

module.exports = {
    getAllLocations: async (req, res, next) => {
        try {
            const locations = await deliveryModel.find(
                {},
                { charges: 0, children: { $elemMatch: { $exists: true } } }
            );
            res.json(locations);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    createLocation: async (req, res, next) => {
        try {
            //? Duplicating value to label
            req.body.label = req.body.value;
            const location = await deliveryModel.create(req.body);
            res.status(201).json(location);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    getCharges: async (req, res, next) => {
        const { location } = req.params;

        const [parentLocation, childLocation] = location.split(",");

        try {
            let charges;

            //? When Child exits
            if (childLocation) {
                const parent = await deliveryModel.findOne({
                    value: parentLocation,
                });
                if (!parent) {
                    return res
                        .status(404)
                        .json({ message: "Parent location not found" });
                }
                const child = parent.children.find(
                    (child) => child.value === childLocation
                );
                if (!child) {
                    return res
                        .status(404)
                        .json({ message: "Child location not found" });
                }
                charges = child.charges;

                //? When only Parent
            } else {
                const parent = await deliveryModel.findOne({
                    value: parentLocation,
                });
                if (!parent) {
                    return res
                        .status(404)
                        .json({ message: "Location not found" });
                }
                charges = parent.charges;
            }

            res.json({ charges });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getAll: async (req, res, next) => {
        try {
            const body = await deliveryModel.find().sort({_id: -1});
            res.status(200).send(body);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateLocation: async (req, res, next) => {
        const { id } = req.params;
        req.body.label = req.body.value;

        try {
            const location = await deliveryModel.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }
            res.status(200).json(location);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteLocation: async (req, res, next) => {
        const { id } = req.params;

        try {
            const location = await deliveryModel.findByIdAndDelete(id);
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }
            res.status(200).json({ message: "Location deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    addChildLocation: async (req, res, next) => {
        const { id } = req.params;
        const child = req.body;
    
        try {
            const location = await deliveryModel.findById(id);
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }
    
            // Set child's label equal to its value
            child.label = child.value;
    
            location.children.push(child);
            await location.save();
    
            res.status(201).json(location);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    updateChildLocation: async (req, res, next) => {
        const { id, childId } = req.params;
        const values = req.body;
    
        try {
            const location = await deliveryModel.findById(id);
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }
    
            const child = location.children.id(childId);
            if (!child) {
                return res
                    .status(404)
                    .json({ message: "Child location not found" });
            }
    
            // Set child's label equal to its value
            values.label = values.value;
    
            Object.assign(child, values);
            await location.save();
    
            res.status(200).json({
                message: "Child location updated successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteChildLocation: async (req, res, next) => {
        const { id, childId } = req.params;

        try {
            const location = await deliveryModel.findById(id);
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }

            location.children.pull(childId);
            await location.save();

            res.status(200).json({
                message: "Child location deleted successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
