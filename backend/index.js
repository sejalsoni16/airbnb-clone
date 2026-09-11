import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";

dotenv.config()
let port = process.env.PORT || 6000;

let app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter);

app.listen(port,()=>{
  connectDb();
  console.log("server started");
})
