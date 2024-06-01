import User from "../model/User.js";
import bcrypt from "bcryptjs"

//get Users
export const getAllUsers = async (req,res,next)=>{
    let users;
    try {
        users = await User.find()
    } catch (err) {
        console.log(err)
    }
    if(!users){
         return res.status(404).json({messege:"no users found"})
    }
    return  res.status(200).json({users})
}

//SIGNUP
export const signup = async (req,res,next)=>{
    const {name,email,password} = req.body;
    
    if(!email || !password){
        return res.send(404).json({messege:"email and password is required"})
    }
    let isUserExist;
    try{
        isUserExist = await User.findOne({email})
    }catch(error){
        return console.log(error)
    }
    if(isUserExist){
       return res.status(400).json({messege:"user already exist please login"})
    }

    const hashedPassword = bcrypt.hashSync(password);
   const user = new User({
    name, 
    email,
    password:hashedPassword,
    blogs:[]
   });

   try {
    await user.save()
   } catch (error) {
    return console.log(error)
   }
   return res.status(201).json({user,messege:"signup successful"})
}

//LOGIN
export const login = async (req,res,next)=>{
    const {email,password} = req.body;
    let isUserExist;
    try{
        isUserExist = await User.findOne({email})
    }catch(error){return console.log(error)}

    if(!isUserExist){
        return res.status(404).json({messege:"user doesn't exist please signup"})
    }
     const isPasswordCorrect = bcrypt.compareSync(password,isUserExist.password)
     if(!isPasswordCorrect){
       return res.status(400).json({messege:"incorrect password"})
     }
     return res.status(200).json({messege:"login successful"})
}

//DELETE
export const Delete = async(req,res)=>{
    const {email,password} = req.body;
    let isUserExist;
    try {
        isUserExist = await User.findOne({email})
    } catch (error) {
        console.log(error)
    }
    if(!isUserExist){
        return res.status(400).json({messege:"user doesnt exist"})
    }
    let isPasswordCorrect = bcrypt.compareSync(password,isUserExist.password)
    if(!isPasswordCorrect){return res.status(400).json({messege:"incorrect password"})}
    await User.deleteOne({email})
    return res.json({messege:"user deleted"})
}