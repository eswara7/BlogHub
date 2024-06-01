import mongoose, { mongo } from "mongoose";

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String, //url
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
});
export default mongoose.model("Blog",blogSchema);