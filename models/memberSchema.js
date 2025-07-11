import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please enter your Name!"],
    },
    image_url: {
        type: String,
        trim: true,
        required: [true, "Please enter the image url (ex: https://abc.com)!"],
    },
    committee: {
        type: String,
        required: [true, "Please select a committee ( new / old )!"],
        enum: ["new", "old"]
    },
    post: {
        type: String,
        trim: true,
        required: [true, "Please enter your post (ex: Advisor)!"],
    },
    roll: {
        type: Number,
        trim: true,
        required: [true, "Please enter your roll-no. (ex: 2103003 )!"],
    },
    department: {
        type: String,
        trim: true,
        required: [true, "Please enter your department shortly! (ex: CSE )"],
    },
    contact: {
        type: String,
        trim: true,
        required: [true, "Please enter your phone number!"],
    },
    series: {
        type: Number,
        required: [true, "Please enter your series (ex: 21 )!"],
    }
})

export const Member = mongoose.model("Member", memberSchema);