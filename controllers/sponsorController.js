import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Sponsor } from "../models/sponsorSchema.js";
import ErrorHandler from "../middlewares/error.js";


export const getSponsors = catchAsyncErrors(async (req, res, next) => {
    const sponsors = await Sponsor.find();
    res.status(200).json({
        success: true,
        sponsors,
    });
});

export const get_a_sponsor = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const sponsor = await Sponsor.findById(id);

    if (!sponsor) {
        return next(new ErrorHandler("Sponsor not found!", 404));
    }

    res.status(200).json({
        success: true,
        data: sponsor,
    });
});


export const postSponsor = catchAsyncErrors(async (req, res, next) => {
    const { name, logo_url } = req.body;

    if (!name || !logo_url) {
        return next(new ErrorHandler("All fields are required!", 400));
    }

    const sponsor = await Sponsor.create({ name, logo_url });

    res.status(201).json({
        success: true,
        message: "Sponsor added successfully!",
        data: sponsor,
    });
});


export const updateSponsor = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedSponsor = await Sponsor.findByIdAndUpdate(id, req.body, { 
        new: true, 
        runValidators: true 
    });

    if (!updatedSponsor) {
        return next(new ErrorHandler("Sponsor not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Sponsor updated successfully!",
        data: updatedSponsor,
    });
});


export const deleteSponsor = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const sponsor = await Sponsor.findByIdAndDelete(id);

    if (!sponsor) {
        return next(new ErrorHandler("Sponsor not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Sponsor deleted successfully!",
    });
});