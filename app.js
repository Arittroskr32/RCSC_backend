import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import xss from "xss-clean";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import memberRouter from "./routes/memberRouter.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import contactRouter from "./routes/contactRouter.js";
import achievementRouter from "./routes/achievementRouter.js";
import dev_teamRouter from "./routes/dev_teamRouter.js";
import announcementRouter from "./routes/announcementRouter.js";
import sponsorRouter from "./routes/sponsorRouter.js";
import clubActivitiesRouter from "./routes/club_activitiesRouter.js";
import clubMemberRouter from "./routes/clubMemberRouter.js";

import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({ path: "./.env" });

// Security headers
app.use(helmet());

// Limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Enable CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Prevent XSS attacks
app.use(xss());

// Parse cookies and body
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/members", memberRouter);
app.use("/api/admin", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/contact", contactRouter);
app.use("/api/achievements", achievementRouter);
app.use("/api/dev_team", dev_teamRouter);
app.use("/api/announcement", announcementRouter);
app.use("/api/sponsors", sponsorRouter);
app.use("/api/activities", clubActivitiesRouter);
app.use("/api/club-member", clubMemberRouter);


// Database connection
dbConnection();

// error handler
app.use(errorMiddleware);

export default app;
