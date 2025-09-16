const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

module.exports = {
    login: async (req, res) => {
        let { username, password } = req.body;
        username = username.trim();
        password = password.trim();

        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    },

    signup: async (req, res) => {
        let { username, password } = req.body;
        username = username.trim();
        password = password.trim();

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(402).json({ message: "User already exists!" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

        return res
            .status(201)
            .json({ message: "User created successfully", token });
    },
};


