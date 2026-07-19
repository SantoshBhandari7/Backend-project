import { NextFunction, Request, Response } from "express";
import User from "../models/user.models";
import { compare, hash } from "../utils/bycript.utils";
import { apiError } from "../utils/apiError.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { upload } from "../utils/cloudinary.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import ENV_CONFIG from "../config/env.config";
import { sendMail } from "../utils/sendEmailService.utils";
import {
  AccountCreatedEmailHtml,
  LoginDetectedEmailHtml,
} from "../utils/emailTemplate.utils";

const uploadFolder = "/profiles";
//*register
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { full_name, email, password, phone } = req.body;
    const file = req.file;
    console.log(file);

    // if (!full_name) {
    //   // const error: any = new Error("Full name is required");
    //   // error.statusCode = 400;
    //   // error.status = "fail";
    //   throw new apiError("Full_name is required", 404);
    // }
    // if (!email) {
    //   // const error: any = new Error("email is required");
    //   // error.statusCode = 400;
    //   // error.status = "fail";
    //   // throw error;
    //   throw new apiError("email is required", 404);
    // }
    // if (!password) {
    //   // const error: any = new Error("password is required");
    //   // error.statusCode = 400;
    //   // error.status = "fail";
    //   // throw error;
    //   throw new apiError("password is required", 404);
    // }
    // const user = await User.create({full_name , email, password,phone});
    const user = new User({ full_name, email, password, phone });

    //*password hash

    const hashPass = await hash(password);
    user.password = hashPass;

    //*handler image upload
    if (file) {
      // user.profile_image = file.path;
      const { path, public_id } = await upload(file, uploadFolder);
      user.profile_image = {
        path,
        public_id,
      };
    }

    //*save
    await user.save();

    //*send account created email
    sendMail({
      to: user.email,
      subject: "account is created",
      html: AccountCreatedEmailHtml({
        full_name: user.full_name,
        email: user.email,
        createdAt: user.createdAt,
      }),
    });

    //*send success response
    sendResponse(res, {
      data: user,
      message: "Account is created",
      statusCode: 201,
    });
  },
);

//*login
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email) {
      // const error: any = new Error("email is required");
      // error.statusCode = 400;
      // error.status = "fail";
      // throw error;
      throw new apiError("email is required", 404);
    }
    if (!password) {
      // const error: any = new Error("password is required");
      // error.statusCode = 400;
      // error.status = "fail";
      // throw error;
      throw new apiError("password is required", 404);
    }
    //* find by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // const error: any = new Error("Invalid credintals");
      // error.statusCode = 400;
      // error.status = "fail";
      // throw error;
      throw new apiError("Invalid credintials ", 404);
    }

    //*compare password
    const isPasswordMath = await compare(password, user.password);
    if (!isPasswordMath) {
      //   const error: any = new Error("Invalid credintals");
      // error.statusCode = 400;
      // error.status = "fail";
      // throw error;
      throw new apiError("Invalid credintials ", 404);
    }

    //* generate jwt token

    const access_token = generateJwtToken({
      _id: user._id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    });

   

    sendMail({
      to: "santooshbhandari88gmail.com",
      subject: "login successfully ",
      html: LoginDetectedEmailHtml({
        full_name: user.full_name,
        email: user.email,
        loginAt: new Date(Date.now()),
      }),
    });
    
     //*set cookie
    res.cookie("access_token", access_token, {
      httpOnly: ENV_CONFIG.node_env === "development" ? false : true,
      maxAge: Number(ENV_CONFIG.cookie_expiry ?? "7") * 24 * 60 * 60 * 1000,
      sameSite: ENV_CONFIG.node_env === "development" ? "lax" : "none",
      secure: ENV_CONFIG.node_env === "development" ? false : true,
    });

    sendResponse(res, {
      data: {
        data: user,
        access_token,
      },
      message: "Login Successfull",
      statusCode: 201,
    });
  },
);

//*get profile

export const getProfiles =catchAsync(async(req:Request, res:Response)=>{

  const {id} = req.params;

  const user = await User.findOne({_id:id});

  if(!user){
    throw new apiError("profile not found",404);
  }
  sendResponse(res,{
    message:"profile fetched",
    data:user,
    statusCode:200,
  })
})
//  console.log("JWT Secret:", ENV_CONFIG.jwt_secrete);

//*change password

//*change email

//* forgot password
