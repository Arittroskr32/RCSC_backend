import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { body, validationResult } from "express-validator";
import { Contact } from "../models/contactSchema.js";
import ErrorHandler from "../middlewares/error.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { removeMaliciousContent } from "../middlewares/sanitize.js";

dotenv.config();

//message validator
export const validateMessage = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required.")
    .isLength({ min: 2, max: 36 }).withMessage("Username must be 2–36 characters long.")
    .escape(),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Invalid email format.")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required.")
    .matches(/^\+?[\d\s\-()]{7,20}$/).withMessage("Invalid phone number."),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required.")
    .isLength({ min: 10, max: 500 }).withMessage("Message must be 10–500 characters.")
    .escape()
];


// Get all messages
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Contact.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

// get a particular message
export const get_a_message = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    return next(new ErrorHandler("Contact not found!", 404));
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// Post a new message
export const postMessage = catchAsyncErrors(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array()[0].msg, 400));
  }

  let { username, email, phone, message } = req.body;

  // Sanitize inputs
  username = removeMaliciousContent(username);
  email = removeMaliciousContent(email);
  phone = removeMaliciousContent(phone);
  message = removeMaliciousContent(message);

  const newMessage = await Contact.create({
    username,
    email,
    phone,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully!"
  });
});

// delet a message
export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Contact.findById(id);

  if (!message) {
    return next(new ErrorHandler("Message not found!", 404));
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully!",
  });
});

// send mail
export const sendReply = [
  catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errors.array()[0].msg, 400));
    }

    const { to, subject, text, username } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      username,
      subject,
      text
    };

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions); 

      res.status(200).json({
        success: true,
        message: "Reply sent successfully!",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return next(new ErrorHandler("Failed to send email, try again later.", 500));
    }
  }),
];