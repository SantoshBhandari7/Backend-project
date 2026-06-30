import mongoose from "mongoose";

export const connectDb =(DB_URI:string)=>{
        mongoose.connect(DB_URI).then(()=>{
                console.log("database connected");
        }).catch((error)=>{
                console.log("----database connection error-----");
                console.log(error);
        })

}