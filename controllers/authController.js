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
          return res.status(401).json({ message: "Invalid username or password" });
        }
      
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          return res.status(401).json({ message: "Invalid username or password" });
        }
      
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
      },
};