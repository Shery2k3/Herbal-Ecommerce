const errorHandler = (err, req, res, next) => {
    console.error("Error Stack:", err.stack);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = "Resource not found";
        return res.status(404).json({
            success: false,
            message,
            error: "Invalid ID format",
        });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        return res.status(400).json({
            success: false,
            message,
            error: "Duplicate entry",
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        return res.status(400).json({
            success: false,
            message,
            error: "Validation failed",
        });
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token";
        return res.status(401).json({
            success: false,
            message,
            error: "Authentication failed",
        });
    }

    if (err.name === "TokenExpiredError") {
        const message = "Token expired";
        return res.status(401).json({
            success: false,
            message,
            error: "Token has expired",
        });
    }

    // Cloudinary errors
    if (err.name === "CloudinaryError") {
        const message = "Image upload failed";
        return res.status(500).json({
            success: false,
            message,
            error: err.message,
        });
    }

    // Default error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error:
            process.env.NODE_ENV === "development"
                ? err.stack
                : "Something went wrong",
    });
};

const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
        error: "Endpoint does not exist",
    });
};

module.exports = { errorHandler, notFound };
