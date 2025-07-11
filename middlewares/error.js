class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate value entered for ${Object.keys(err.keyValue).join(", ")}`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Please log in again.`;
        err = new ErrorHandler(message, 401);
    }

    if (err.name === "TokenExpiredError") {
        const message = `JSON Web Token expired. Please log in again.`;
        err = new ErrorHandler(message, 401);
    }

    if (process.env.NODE_ENV === "development") {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack, 
        });
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;