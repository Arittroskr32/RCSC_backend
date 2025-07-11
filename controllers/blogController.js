import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blogSchema.js";

export const post_blog = catchAsyncErrors(async (req, res, next) => {
    const { title, description, author, image, tags, date, category } = req.body;

    if (!title || !description || !author || !image || !tags || !date || !category) {
        return next(new ErrorHandler("Please fill the full form correctly!", 400));
    }

    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
        return next(new ErrorHandler("Invalid date format! Use 'Feb 7, 2025'.", 400));
    }

    const newBlog = await Blog.create({
        title,
        description,
        author,
        image,
        tags,
        category,
        date: formattedDate
    });

    res.status(201).json({
        success: true,
        message: "Blog posted successfully!",
        blog: newBlog
    });
});

// get a particular blog
export const get_a_blog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const single_blog = await Blog.findById(id);

  if (!single_blog) {
      return next(new ErrorHandler("Blog not found!", 404));
  }

  res.status(200).json({
      success: true,
      data: single_blog,
  });
});


export const get_blogs = catchAsyncErrors(async (req, res, next) => {
    const blogs = await Blog.find();

    if (!blogs || blogs.length === 0) {
        return next(new ErrorHandler("No blogs found!", 404));
    }

    res.status(200).json({
        success: true,
        count: blogs.length,
        blogs
    });
});


export const update_blog = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; 
    const { title, description, author, image, tags, date, category } = req.body;

    if (!title || !description || !author || !image || !tags || !date|| !category) {
        return next(new ErrorHandler("Please fill the full form correctly!", 400));
    }

    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
        return next(new ErrorHandler("Invalid date format! Use 'Feb 7, 2025'.", 400));
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        id, 
        {
            title,
            description,
            author,
            image,
            tags,
            category,
            date: formattedDate
        },
        { new: true, runValidators: true } 
    );

    if (!updatedBlog) {
        return next(new ErrorHandler("Blog not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Blog updated successfully!",
        blog: updatedBlog
    });
});


export const delete_blog = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; 
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
        return next(new ErrorHandler("Blog not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully!"
    });
});

// export const set_like = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params;
//     const { likes } = req.body;

//     if (likes === undefined || typeof likes !== "number" || likes < 0) {
//         return next(new ErrorHandler("Please provide a valid like count (non-negative number).", 400));
//     }

//     const blog = await Blog.findById(id);

//     if (!blog) {
//         return next(new ErrorHandler("Blog not found!", 404));
//     }

//     blog.likes = likes; 
//     await blog.save();

//     res.status(200).json({
//         success: true,
//         message: "Like count updated successfully!",
//         blog
//     });
// });


// export const blog_like = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params; 
//     const { action } = req.body;  
//     if (!action) {
//         return next(new ErrorHandler("Please provide an action (like)", 400));
//     }

//     const blog = await Blog.findById(id);

//     if (!blog) {
//         return next(new ErrorHandler("Blog not found!", 404));
//     }

//     if (action === "like") {
//         blog.likes += 1;
//     }

//     await blog.save();
//     res.status(200).json({
//         success: true,
//         message: "Blog updated successfully with like",
//         blog
//     });
// });

