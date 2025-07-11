import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Achievement } from "../models/achievementSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { removeMaliciousContent } from "../middlewares/sanitize.js";


export const getAchievements = catchAsyncErrors(async (req, res, next) => {
  const achievements = await Achievement.find();
  res.status(200).json({
    success: true,
    achievements,
  });
});

export const get_a_achievement = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const achievement = await Achievement.findById(id);

  if (!achievement) {
      return next(new ErrorHandler("achievement not found!", 404));
  }

  res.status(200).json({
      success: true,
      data: achievement,
  });
});

export const postAchievement = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Unauthorized access!", 403));
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("All fields are required!", 400));
  }

  const newAchievement = await Achievement.create({ title, description });

  res.status(201).json({
    success: true,
    message: "Achievement added successfully!",
    data: newAchievement,
  });
});


export const updateAchievement = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Unauthorized access!", 403));
  }

  const { id } = req.params;
  const { title, description } = req.body;

  let achievement = await Achievement.findById(id);
  if (!achievement) {
    return next(new ErrorHandler("Achievement not found!", 404));
  }

  achievement.title = title || achievement.title;
  achievement.description = description || achievement.description;
  await achievement.save();

  res.status(200).json({
    success: true,
    message: "Achievement updated successfully!",
    data: achievement,
  });
});


export const deleteAchievement = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Unauthorized access!", 403));
  }

  const { id } = req.params;
  const achievement = await Achievement.findById(id);

  if (!achievement) {
    return next(new ErrorHandler("Achievement not found!", 404));
  }

  await achievement.deleteOne();

  res.status(200).json({
    success: true,
    message: "Achievement deleted successfully!",
  });
});
