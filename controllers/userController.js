import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken, clearToken } from "../utils/jwtToken.js";
import dotenv from "dotenv";
import { webcrypto } from "crypto";

dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // hashed SHA-256 string
const ADMIN_SECRET = process.env.ADMIN_SECRET;

// Admin Login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { username, password, secretKey } = req.body;

  if (!username || !password || !secretKey) {
    return next(new ErrorHandler("Please provide username, password, and secret key!", 400));
  }

  // Check username and secret key
  if (username !== ADMIN_USERNAME || secretKey !== ADMIN_SECRET) {
    return next(new ErrorHandler("Invalid Admin Credentials!", 401));
  }

  // Hash password using SHA-256 and compare with stored hash
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await webcrypto.subtle.digest("SHA-256", data);
  const hashedPassword = Buffer.from(hashBuffer).toString("hex");

  if (hashedPassword !== ADMIN_PASSWORD) {
    return next(new ErrorHandler("Invalid Admin Credentials!", 401));
  }

  // Generate token and set in httpOnly cookie
  generateToken({ role: "admin" }, res, "Admin Logged In Successfully!");
});

// Admin Logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  clearToken(res, "Logged Out Successfully!");
});

// Get Admin Info
export const getUser = catchAsyncErrors(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(new ErrorHandler("Not authorized!", 403));
  }

  res.status(200).json({
    success: true,
    user: {
      role: req.user.role,
    },
  });
});
