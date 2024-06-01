import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req,res)=>{
    let blogs;
    try {
        blogs = await Blog.find()
    } catch (error) {
        return console.log(error)
    }
    if(!blogs){
        return res.status(404).json({messege:"no blogs found"})
    }
    return res.status(200).json({blogs})
}

//ADD BLOG
export const addBlog = async(req,res)=>{
    const {title,description,image,user} = req.body;

    let isUserExist;
    try {
        isUserExist = await User.findById(user)
    } catch (error) {
        console.log(error)
    }
    if(!isUserExist){
        return res.status(404).json({messege:"user doesn't exist with this ID"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        isUserExist.blogs.push(blog)
        await isUserExist.save({session})
        await session.commitTransaction()
    } catch (error) {
        console.log(error);
        return res.status(400).json({messege:error})
    }
    return res.status(200).json({blog,messege:"blog added"})
}

//UPDATE BLOG
export const updateBlog = async(req,res)=>{
    const blogID = req.params.id;
    const {title,description} = req.body;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogID,({
            title,
            description
        }))
    } catch (error) {
        console.log(error)
    }
    if(!blog){
        return res.status(404).json({messege:"unable to update blog"})
    }
    return res.status(200).json({blog,messege:"blog updated"})
}

//GET BY ID
export const getById = async (req,res)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        console.log(blog)
    }
    if(!blog){
        return res.status(404).json("blog doesn't exist")
    }
    return res.status(200).json({blog})
}

//DELETE BY ID
export const deleteBlog = async(req,res)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        console.log(error)
    }
    if(!blog){
        return res.status(404).json({messege:"blog doesn't exist"})
    }
    return res.status(200).json({blog,messege:"blog has been deleted"})

}

//GET BY USER ID
export const getByUserId = async (req,res)=>{
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs")
    } catch (error) {
        console.log(error)
    }
    if(!userBlogs){
        return res.status(404).json({messege:"user doesn't exist"})
    }
    return res.status(200).json({blogs:userBlogs })
}