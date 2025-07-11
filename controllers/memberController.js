import {catchAsyncErrors} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Member} from "../models/memberSchema.js";

//addmembers function
export const addmember = catchAsyncErrors(async(req,res,next)=>{
    const {name, image_url, committee, post, roll, department, contact, series} = req.body;
    if(!name|| !image_url|| !committee|| !post|| !roll|| !department|| !contact|| !series){
        return next(new ErrorHandler("Please fill the full form correctly"))
    }

    const exist_member = await Member.findOne({name});
    if(exist_member){
        return next(new ErrorHandler("Member already exists !!"));
    }

    const newMember = await Member.create({name, image_url, committee, post, roll, department, contact, series});
    res.status(201).json({success: true, data: newMember});
});

// get a particular member
export const get_a_member = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const member = await Member.findById(id);
  
    if (!member) {
        return next(new ErrorHandler("member not found!", 404));
    }
  
    res.status(200).json({
        success: true,
        data: member,
    });
});

//get all members function
export const getMember = catchAsyncErrors(async(req,res,next)=>{
    const members = await Member.find();
    res.status(200).json({success: true, data: members});
});

//delete member function
export const deleteMember = catchAsyncErrors(async(req,res,next)=>{
    const member = await Member.findByIdAndDelete(req.params.id);
    if(!member){
        return next(new ErrorHandler("Member not found"));
    }
    res.status(200).json({success: true, data: member});
});

//update member function
export const updateMember = catchAsyncErrors(async(req,res,next)=>{
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!member){
        return next(new ErrorHandler("Member not found"));
    }
    res.status(200).json({success: true, data: member});
});