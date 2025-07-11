import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Dev_team } from "../models/dev_teamSchema.js";


export const getDevTeam = catchAsyncErrors(async (req, res, next) => {
    const devTeam = await Dev_team.find();
    res.status(200).json({
      success: true,
      devTeam,
    });
});

export const get_a_developer = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const developer = await Dev_team.findById(id);

  if (!developer) {
      return next(new ErrorHandler("developer not found!", 404));
  }

  res.status(200).json({
      success: true,
      data: developer,
  });
});
  

export const postDevTeam = catchAsyncErrors(async (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("Unauthorized access!", 403));
    }
  
    const { name, roll, dept, image } = req.body;
  
    if (!name || !roll || !dept || !image) {
      return next(new ErrorHandler("All fields are required!", 400));
    }
  
    const newDevTeamMember = await Dev_team.create({ name, roll, dept, image });
  
    res.status(201).json({
      success: true,
      message: "Dev team member added successfully!",
      data: newDevTeamMember,
    });
});
  

export const updateDevTeam = catchAsyncErrors(async (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("Unauthorized access!", 403));
    }
  
    const { id } = req.params;
    const { name, roll, dept, image } = req.body;
  
    let devMember = await Dev_team.findById(id);
    if (!devMember) {
      return next(new ErrorHandler("Dev team member not found!", 404));
    }
  
    devMember.name = name || devMember.name;
    devMember.roll = roll || devMember.roll;
    devMember.dept = dept || devMember.dept;
    devMember.image = image || devMember.image;
    await devMember.save();
  
    res.status(200).json({
      success: true,
      message: "Dev team member updated successfully!",
      data: devMember,
    });
});
  

export const deleteDevTeam = catchAsyncErrors(async (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("Unauthorized access!", 403));
    }
  
    const { id } = req.params;
    const devMember = await Dev_team.findById(id);
  
    if (!devMember) {
      return next(new ErrorHandler("Dev team member not found!", 404));
    }
  
    await devMember.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Dev team member deleted successfully!",
    });
});
