import mongoose from "mongoose";
import validator from "validator";

const club_memberSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please enter the member name!"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please enter an email address!"],
        validate: [validator.isEmail, "Please enter a valid email address!"],
        unique: true,
    },
    series: {
        type: Number,
        required: [true, "Please enter the series (e.g., 21)!"],
        min: [19, "Series must be a positive number!"],
    },
    phone: {
        type: String,
        required: [true, "Please enter a phone number!"],
        validate: {
            validator: function (v) {
                return /^\d{10,15}$/.test(v); 
            },
            message: "Please enter a valid phone number!",
        },
    },
    dept: {
        type: String,
        required: [true, "Please enter the department!"],
        trim: true,
    },
});

export const Club_Members = mongoose.model("Club_Members", club_memberSchema);
