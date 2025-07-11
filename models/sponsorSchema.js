import mongoose from "mongoose";
import validator from "validator";

const sponsorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please enter the sponsor name!"],
    },
    logo_url: {
        type: String,
        trim: true,
        required: [true, "Please enter the logo URL!"],
        validate: [validator.isURL, "Please enter a valid URL!"]
    }
});

export const Sponsor = mongoose.model("Sponsor", sponsorSchema);

