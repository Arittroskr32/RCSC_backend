import mongoose from "mongoose";
import validator from "validator";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please enter the blog title!"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please enter the blog description!"]
    },
    author: {
        type: String,
        trim: true,
        required: [true, "Please enter the author's name!"]
    },
    image: {
        type: String,
        required: [true, "Please enter the blog's image URL!"]
    },
    tags: {
        type: [String],
        default: ["#RUET_cyber_security_club"]
    },
    category: {
        type: String,
        trim: true,
        required: [true, "Please enter the blog's category"]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const Blog = mongoose.model("Blog", blogSchema);