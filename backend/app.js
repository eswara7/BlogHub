import express from "express";
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.port || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users",userRouter);
app.use("/api/blogs",blogRouter)
try {
    mongoose.connect(process.env.MONGO_URI)
.then(()=>app.listen(port))
.then(()=>{console.log(`database connection success and server running at ${port}`)})
.catch((err)=>{console.log(err)});
ci
} catch (error) {
    console.log(error)
}
app.use((err,req,res,next)=>{
    console.log(err)
    return res.status(500).json({messege:"internal server issue"})
})