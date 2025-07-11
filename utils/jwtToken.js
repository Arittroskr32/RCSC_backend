import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Validate required env vars
if (!process.env.JWT_SECRET_KEY || !process.env.JWT_EXPIRE || !process.env.COOKIE_EXPIRE) {
  throw new Error("Missing required environment variables in .env");
}

export const generateToken = (payload, res, message) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE, // e.g., "2h"
  });

  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "Lax",
    path: "/",
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
  };

  res.status(200)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      message,
    });
};

export const clearToken = (res, message) => {
  res.status(200)
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "Lax",
      path: "/",
      expires: new Date(0),
    })
    .json({ success: true, message });
};
