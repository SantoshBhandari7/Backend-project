import { NextFunction, Request, Response } from "express";


export const errorHandler =(error:any , request:Request, response:Response , next:NextFunction) =>{
        const statusCode: number = error?.statusCode ?? 500;
        const message:string =error?.message ?? "Internal server error";
        const success:boolean =error?.success ?? false;
        const status:"error"|"success"| "fail"= error?.status?? "error";

        response.status(statusCode).json({
                message,
                success,
                status,
                data:null
        });
};