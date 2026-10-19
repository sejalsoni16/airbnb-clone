import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import bookingRouter from "./routes/booking.route.js";

dotenv.config();

const port = process.env.PORT || 6000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Temporarily check whether Cloudinary credentials are loaded
console.log("Cloudinary environment check:", {
  cloudName: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
  apiKey: Boolean(process.env.CLOUDINARY_API_KEY),
  apiSecret: Boolean(process.env.CLOUDINARY_API_SECRET),
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
});