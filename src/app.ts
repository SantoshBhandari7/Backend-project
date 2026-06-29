import express,{ NextFunction, Request , Response } from "express";


//* app instance
const app =express();

app.get("/",(req:Request, res:Response ,next:NextFunction)=>{
        res.status(200).json({
                message:"server is running",
                success:true,
                status:"success",
                data:null,
        })
})

//* using middleware 


//*using routes


//*  error routes

//*error handler

export default app;