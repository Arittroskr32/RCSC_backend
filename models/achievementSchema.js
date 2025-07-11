import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please enter the achievement title!"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please enter the achievement description!"]
    }
});

export const Achievement = mongoose.model("Achievement", achievementSchema);

