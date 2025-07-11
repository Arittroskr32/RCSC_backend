import mongoose from "mongoose";

const dev_teamSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please enter the team name!"]
    },
    roll: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Please enter the roll number!"]
    },
    dept: {
        type: String,
        trim: true,
        required: [true, "Please enter the department!"]
    },
    image: {
        type: String,
        trim: true,
        required: [true, "Please enter the image URL!"]
    }
});

export const Dev_team = mongoose.model("Dev_team", dev_teamSchema);

