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
const timeRoutes = require("./routes/timeRoutes");
const messageRoutes = require("./routes/messageRoutes");
const ora = require("ora");

const port = process.env.PORT || 3000;

const app = express();

//* JSON converter middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

//* Allows access for cross-domains
app.use(cors());

//* Routes
const routerBasePath = process.env.ROUTER_BASE_PATH || '';

app.use(`${routerBasePath}/menu`, menuRoutes);
app.use(`${routerBasePath}/delivery`, deliveryRoutes);
app.use(`${routerBasePath}/blog`, blogRoutes);
app.use(`${routerBasePath}/checkout`, checkoutRoutes);
app.use(`${routerBasePath}/image`, staticRoutes);
app.use(`${routerBasePath}/email`, emailRoutes);
app.use(`${routerBasePath}/auth`, authRoutes);
app.use(`${routerBasePath}/time`, timeRoutes);
app.use(`${routerBasePath}/message`, messageRoutes);


//* Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({ error: message });
});

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
