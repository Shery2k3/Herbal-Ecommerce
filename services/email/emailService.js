const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "houseofdumplingsapp@gmail.com",
        pass: process.env.GMAIL_APP_PASS,
    },
});

async function sendMail(subject, text, to) {
    if (!subject || !text) {
        console.error("Subject and text are required to send an email");
        return "Subject and text are required to send an email"; // Do not proceed if subject or text is missing
    }

    var mailOptions = {
        from: "houseofdumplingsapp@gmail.com",
        //! Change
        to: to || "houseofdumplingss@gmail.com",
        subject: subject,
        html: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: " + info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = sendMail;
