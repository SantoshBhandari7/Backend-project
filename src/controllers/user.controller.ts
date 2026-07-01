import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/user.models";

//*getall user
export const getall = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "record Fetched success fully",
      success: true,
      status: "Success",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

//* getbyId

export const getbyId = async(req:Request, res:Response,next:NextFunction)=>{
       try {
         const { id }= req.params;
        const user = await User.findById({id});

        if(!user){
                res.status(404).json({
                        message:"User not found",
                        success:false,
                        data:null,
                });
        }
        res.status(200).json({
                message:"User data fetched successfully",
                success:true,
                data:user,
        });
        
       } catch (error) {
        next(error);
        
       }
}

//*get all admin


//* update

export const update = async(req:Request , res:Response, next:NextFunction)=>{
        try {
                const {id} =req.params;
                const {full_name , email , password , phone} =req.body;

                const user = User.findByIdAndUpdate(id,{full_name, email , password, phone}, {new :true});
                if(!user){
                        res.status(404).json({
                                message:"user not found",
                                success:false,
                                data:null,
                        });
                };
                res.status(200).json({
                        message:"User updated successfully",
                        success:true,
                        data:user,
                });   
        } catch (error) {
                next(error);
                
        }
}

//*deleted

export const remove = async(req:Request , res:Response, next:NextFunction)=>{
        try {
                const {id}= req.params;
                const user = User.findByIdAndDelete(id);

                if(!user){
                        res.status(404).json({
                                message:"User not found",
                                success:true,
                                data:null,
                        });
                };
                res.status(200).json({
                        message:"user deleted successfully",
                        success:true,
                        data:null,
                })
                
        } catch (error) {
                next(error);
                
        }
}
