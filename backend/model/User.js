import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
    }]
});
const User = mongoose.model("User",userSchema)
//naming convention first cap User will be saved as users in db
export default User
