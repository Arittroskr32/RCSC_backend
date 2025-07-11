import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Club_Members } from "../models/club_memberSchema.js";
import ErrorHandler from "../middlewares/error.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Add a new club member
export const add_club_member = catchAsyncErrors(async (req, res, next) => {
    const { name, email, series, phone, dept } = req.body;

    if (!name || !email || !series || !phone || !dept) {
        return next(new ErrorHandler("All fields are required!", 400));
    }

    const member = await Club_Members.create({ name, email, series, phone, dept });

    res.status(201).json({
        success: true,
        message: "Club member added successfully!",
        data: member,
    });
});

// Delete a club member by email
export const delete_club_member = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler("Email is required to delete a member!", 400));
    }
    const member = await Club_Members.findOne({ email });
    if (!member) {
        return next(new ErrorHandler("Club member not found with this email!", 404));
    }

    await member.deleteOne();
    res.status(200).json({
        success: true,
        message: "Club member deleted successfully!",
    });
});

// Get all club members
export const get_all_club_members = catchAsyncErrors(async (req, res, next) => {
    const members = await Club_Members.find().sort({ series: -1 });

    res.status(200).json({
        success: true,
        data: members,
    });
});

// Get a single club member by email
export const get_club_member_by_email = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler("Email is required to fetch member!", 400));
    }
    const member = await Club_Members.findOne({ email });
    if (!member) {
        return next(new ErrorHandler("Club member not found with this email!", 404));
    }

    res.status(200).json({
        success: true,
        data: member,
    });
});


// Send email to all club members
export const sendMailToAllMembers = catchAsyncErrors(async (req, res, next) => {
    const { subject, text } = req.body;

    if (!subject || !text) {
        return next(new ErrorHandler("Subject and text are required.", 400));
    }

    // Fetch all club members' emails
    const members = await Club_Members.find({}, "email");
    const emailList = members.map(member => member.email);

    if (emailList.length === 0) {
        return next(new ErrorHandler("No club members found to send emails.", 404));
    }

    // Set up transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    });

    const failed = [];
    const success = [];

    for (const email of emailList) {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject,
            text
        };

        try {
            await transporter.sendMail(mailOptions);
            success.push(email);
        } catch (error) {
            console.error(`Failed to send to ${email}:`, error.message);
            failed.push(email);
        }
    }

    res.status(200).json({
        success: true,
        message: "Email sending completed.",
        sent: success,
        failed,
    });
});

