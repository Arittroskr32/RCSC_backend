import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Activities } from "../models/club_activitiesSchema.js";
import ErrorHandler from "../middlewares/error.js";


export const getActivities = catchAsyncErrors(async (req, res, next) => {
    const activities = await Activities.find();
    res.status(200).json({
        success: true,
        activities,
    });
});

// get a particular activity
export const get_a_activity = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const activity = await Activities.findById(id);

  if (!activity) {
      return next(new ErrorHandler("activity not found!", 404));
  }

  res.status(200).json({
      success: true,
      data: activity,
  });
});

export const postActivity = catchAsyncErrors(async (req, res, next) => {
    const { event_type, title, date, description, image, gallery } = req.body;

    if (!event_type || !title || !description || !image) {
        return next(new ErrorHandler("All fields except gallery are required!", 400));
    }

    const newActivity = await Activities.create({ 
        event_type, 
        title, 
        date: date ? new Date(date) : undefined,
        description, 
        image, 
        gallery 
    });

    res.status(201).json({
        success: true,
        message: "Activity added successfully!",
        data: newActivity,
    });
});


export const updateActivity = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (updatedData.date) {
        updatedData.date = new Date(updatedData.date);
    }

    const updatedActivity = await Activities.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });

    if (!updatedActivity) {
        return next(new ErrorHandler("Activity not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Activity updated successfully!",
        data: updatedActivity,
    });
});


export const deleteActivity = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const activity = await Activities.findByIdAndDelete(id);

    if (!activity) {
        return next(new ErrorHandler("Activity not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Activity deleted successfully!",
    });
});