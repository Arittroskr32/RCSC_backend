import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please enter the announcement title!"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please enter the announcement description!"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        trim: true,
        required: [true, "Please enter the announcement image URL!"]
    },
    post_url: {
        type: String,
        trim: true,
        required: [true, "Please enter the announcement post URL!"]
    }
});

export const Announcement = mongoose.model("Announcement", announcementSchema);

