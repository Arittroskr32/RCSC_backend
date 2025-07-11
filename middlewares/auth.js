import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("User not authorized. Token missing.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded.role) {
      return next(new ErrorHandler("Invalid token payload.", 400));
    }

    // Only allow admins (you can expand roles later)
    if (decoded.role === "admin") {
      req.user = {
        username: decoded.username || "Admin",
        role: "admin",
      };
      return next();
    } else {
      return next(new ErrorHandler("Access Denied! Insufficient permissions.", 403));
    }

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Session expired. Please log in again.", 401));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid token. Please log in again.", 401));
    }
    return next(new ErrorHandler("Authentication failed. Token verification error.", 401));
  }
});
