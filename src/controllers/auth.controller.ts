import { NextFunction, Request, Response } from "express";
import User from "../models/user.models";
import { compare, hash } from "../utils/bycript.utils";
// import { compare } from "bcryptjs";

//*register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password, phone } = req.body;
    if (!full_name) {
      const error: any = new Error("Full name is required");
      error.statusCode = 400;
      error.status = "fail";
      throw error;
    }
    if (!email) {
      const error: any = new Error("email is required");
      error.statusCode = 400;
      error.status = "fail";
      throw error;
    }
    if (!password) {
      const error: any = new Error("password is required");
      error.statusCode = 400;
      error.status = "fail";
      throw error;
    }

    // const user = await User.create({full_name , email, password,phone});

    const user = new User({ full_name, email, password, phone });

    //*password hash

    const hashPass = await hash(password);
    user.password = hashPass;

    //*error handler
    await user.save();

    //*
    res.status(201).json({
      message: "Account Created",
      success: true,
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//*login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      const error: any = new Error("email is required");
      error.statusCode = 400;
      error.status = "fail";
      throw error;
    }
    if (!password) {
      const error: any = new Error("password is required");
      error.statusCode = 400;
      error.status = "fail";
      throw error;
    }
    //* find by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error: any = new Error("Invalid credintals");
      error.statusCode = 400;
      error.status = "fail";
      throw error;
    }

    //*compare password
    const isPasswordMath = await compare(password ,user.password);
    if (!isPasswordMath) {
        const error: any = new Error("Invalid credintals");
      error.statusCode = 400;
      error.status = "fail";
      throw error;

    }

    res.status(201).json({
        message:"login successful",
        success:true,
        status:"success",
        data:user,
    })
  } catch (error) {
        next(error)
  }
};

//*get profile

//*change password

//*change email

//* forgot password
