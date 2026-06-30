import mongoose, { Schema } from "mongoose";

//using schema

const userSchema= new mongoose.Schema({
        full_name :{
                type:String,
                required:[true,"full_name is required"],
                minLength:[3, "full_name must be at least 3 character"],
        },
        email:{
                type:String,
                required:[true, "email is required"],
                unique:[true, "user already exists with provided email"],
        },
        password:{
                type:String,
                required:[true, "password is required"]
        },
        role:{
                type:String,
                enum:[ "USER", "ADMIN","SUPER_ADMIN"],
                default:"USER",
        },
        profile_image:{
                type:String,
        },
        phone:{
                type:String,
        },
},{
        timestamps:true,
});


//*user model
const User = mongoose.model("user",userSchema);
export default User;