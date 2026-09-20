import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors"

dotenv.config()
let port = process.env.PORT || 6000;

let app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173", "http://localhost:5174"],
  credentials:true
}))

app.use("/api/auth", authRouter);

app.listen(port,()=>{
  connectDb();
  console.log("server started");
})
