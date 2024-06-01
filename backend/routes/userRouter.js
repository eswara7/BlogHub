import express from "express";
import {Delete, getAllUsers, login, signup} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/",getAllUsers).delete("/",Delete)
userRouter.post("/signup",signup) 
userRouter.post("/login",login)

export default userRouter