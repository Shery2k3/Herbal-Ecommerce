require("dotenv").config();
const express = require("express");
const cors = require("cors");
const deliveryRoutes = require("./routes/deliveryRoutes");
const menuRoutes = require("./routes/menuRoutes");
const blogRoutes = require("./routes/blogRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const staticRoutes = require("./routes/staticRoutes");
const connectDB = require("./config/db");
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");
const branchRoutes = require("./routes/branchRoutes");
const messageRoutes = require("./routes/messageRoutes");
const menuRoutesv2 = require("./routes/v2/menuRoutes");
const cityRoutes = require("./routes/v2/cityRoutes");
const ora = require("ora");
const { errorHandler, notFound } = require("./middleware/error");

const port = process.env.PORT || 3000;

const app = express();

//* JSON converter middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

//* Allows access for cross-domains
app.use(cors());

//* Routes

app.use(`/menu`, menuRoutes);
app.use(`/delivery`, deliveryRoutes);
app.use(`/blog`, blogRoutes);
app.use(`/checkout`, checkoutRoutes);
app.use(`/image`, staticRoutes);
app.use(`/email`, emailRoutes);
app.use(`/auth`, authRoutes);
app.use(`/time`, branchRoutes);
app.use(`/branch`, branchRoutes);
app.use(`/message`, messageRoutes);
app.use(`/v2/menu`, menuRoutesv2);
app.use(`/v2/city`, cityRoutes);
app.use("/", (req, res) => {
    res.send("Welcome to the API");
});

//* Not found
app.use(notFound);

//* Error Handler
app.use(errorHandler);

const startServer = async () => {
    const spinner = ora({
        text: "Starting server\n ",
        color: "yellow",
    }).start();
    await connectDB();

    app.listen(port, () => {
        console.log("");
        spinner.succeed(`Server running on port ${port}`);
    });
};

startServer();

//todo
//? Status codes constants file
//? Error handler
//? Menu dynamic category ordering
//? Helmet

//Run
