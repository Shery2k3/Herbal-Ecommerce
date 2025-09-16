require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

const JWT_SECRET = process.env.JWT_SECRET;

const isAdmin = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded._id);
        if (!user) {
            return res
                .status(403)
                .json({ message: "Access denied. Admins only." });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = { isAdmin };