import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Announcement } from "../models/announcementSchema.js";
import ErrorHandler from "../middlewares/error.js";


export const getAnnouncements = catchAsyncErrors(async (req, res, next) => {
    const announcements = await Announcement.find();
    res.status(200).json({
        success: true,
        announcements,
    });
});

export const get_a_announcement = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);

    if (!announcement) {
        return next(new ErrorHandler("Announcement not found!", 404));
    }

    res.status(200).json({
        success: true,
        data: announcement,
    });
});


export const postAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const { title, description, image, post_url } = req.body;

    if (!title || !description || !image || !post_url) {
        return next(new ErrorHandler("All fields are required!", 400));
    }

    const announcement = await Announcement.create({ title, description, image, post_url });

    res.status(201).json({
        success: true,
        message: "Announcement added successfully!",
        data: announcement,
    });
});


export const updateAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, req.body, { 
        new: true, 
        runValidators: true 
    });

    if (!updatedAnnouncement) {
        return next(new ErrorHandler("Announcement not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Announcement updated successfully!",
        data: updatedAnnouncement,
    });
});


export const deleteAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
        return next(new ErrorHandler("Announcement not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Announcement deleted successfully!",
    });
});
