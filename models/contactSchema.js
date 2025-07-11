import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Please enter your Name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your Email!"],
        trim: true,
        validate: [validator.isEmail, "Please enter a valid email!"],
    },
    phone: {
        type: String,
        required: [true, "Please enter your Phone Number!"],
        validate: [validator.isMobilePhone, "Please enter a valid phone number!"],
    },
    message: {
        type: String,
        trim: true,
        required: [true, "Please enter your Message!"]
    }
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);

