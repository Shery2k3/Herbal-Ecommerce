const express = require("express");
const sendMail = require("../services/email/emailService");

const router = express.Router();

router.post("/send", async (req, res) => {
    const { subject, text, to } = req.body;

    try {
        const info = await sendMail(subject, text, to);
        res.status(200).json({ info });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
});

module.exports = router;
