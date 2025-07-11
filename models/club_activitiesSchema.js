import mongoose from "mongoose";

const clubActivitiesSchema = new mongoose.Schema({
    event_type: {
        type: String,
        enum: ["events", "projects", "upcoming", "workshops"],
        required: [true, "Please select an event type!"],
    },
    title: {
        type: String,
        trim: true,
        required: [true, "Please enter the activity title!"],
    },
    date: {
        type: Date,
        required: [true, "Please enter the activity date!"],
        default: Date.now,
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please enter the activity description!"],
    },
    image: {
        type: String,
        trim: true,
        required: [true, "Please enter the activity image URL!"],
    },
    gallery: {
        type: [String],
        validate: {
            validator: function (arr) {
                return arr.every((url) => typeof url === "string");
            },
            message: "Gallery must contain valid URLs!",
        },
    },
});

export const Activities = mongoose.model("Activities", clubActivitiesSchema);

