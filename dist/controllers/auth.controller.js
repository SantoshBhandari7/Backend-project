"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getProfile = exports.login = exports.register = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const bycript_utils_1 = require("../utils/bycript.utils");
const apiError_utils_1 = require("../utils/apiError.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const env_config_1 = __importDefault(require("../config/env.config"));
const sendEmailService_utils_1 = require("../utils/sendEmailService.utils");
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
const uploadFolder = "/profiles";
//*register
exports.register = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
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
    const user = new user_models_1.default({ full_name, email, password, phone });
    //*password hash
    const hashPass = await (0, bycript_utils_1.hash)(password);
    user.password = hashPass;
    //*handler image upload
    if (file) {
        // user.profile_image = file.path;
        const { path, public_id } = await (0, cloudinary_utils_1.upload)(file, uploadFolder);
        user.profile_image = {
            path,
            public_id,
        };
    }
    //*save
    await user.save();
    //*send account created email
    (0, sendEmailService_utils_1.sendMail)({
        to: user.email,
        subject: "account is created",
        html: (0, emailTemplate_utils_1.AccountCreatedEmailHtml)({
            full_name: user.full_name,
            email: user.email,
            createdAt: user.createdAt,
        }),
    });
    //*send success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: user,
        message: "Account is created",
        statusCode: 201,
    });
});
//*login
exports.login = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        // const error: any = new Error("email is required");
        // error.statusCode = 400;
        // error.status = "fail";
        // throw error;
        throw new apiError_utils_1.apiError("email is required", 404);
    }
    if (!password) {
        // const error: any = new Error("password is required");
        // error.statusCode = 400;
        // error.status = "fail";
        // throw error;
        throw new apiError_utils_1.apiError("password is required", 404);
    }
    //* find by email
    const user = await user_models_1.default.findOne({ email }).select("+password");
    if (!user) {
        // const error: any = new Error("Invalid credintals");
        // error.statusCode = 400;
        // error.status = "fail";
        // throw error;
        throw new apiError_utils_1.apiError("Invalid credintials ", 404);
    }
    //*compare password
    const isPasswordMath = await (0, bycript_utils_1.compare)(password, user.password);
    if (!isPasswordMath) {
        //   const error: any = new Error("Invalid credintals");
        // error.statusCode = 400;
        // error.status = "fail";
        // throw error;
        throw new apiError_utils_1.apiError("Invalid credintials ", 404);
    }
    //* generate jwt token
    const access_token = (0, jwt_utils_1.generateJwtToken)({
        _id: user._id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
    });
    (0, sendEmailService_utils_1.sendMail)({
        to: "santooshbhandari88gmail.com",
        subject: "login successfully ",
        html: (0, emailTemplate_utils_1.LoginDetectedEmailHtml)({
            full_name: user.full_name,
            email: user.email,
            loginAt: new Date(Date.now()),
        }),
    });
    //*set cookie
    res.cookie("access_token", access_token, {
        httpOnly: env_config_1.default.node_env === "development" ? false : true,
        maxAge: Number(env_config_1.default.cookie_expiry ?? "7") * 24 * 60 * 60 * 1000,
        sameSite: env_config_1.default.node_env === "development" ? "lax" : "none",
        secure: env_config_1.default.node_env === "development" ? false : true,
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: {
            data: user,
            access_token,
        },
        message: "Login Successfull",
        statusCode: 201,
    });
});
//*get profile
exports.getProfile = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const user = await user_models_1.default.findOne({ _id: id });
    if (!user) {
        throw new apiError_utils_1.apiError("profile not found", 404);
    }
    // send response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "profile fetched",
        data: user,
        statusCode: 200,
    });
});
//  console.log("JWT Secret:", ENV_CONFIG.jwt_secrete);
//* logout
exports.logout = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: env_config_1.default.node_env === "development" ? false : true,
        maxAge: Date.now(),
        sameSite: env_config_1.default.node_env === "development" ? "lax" : "none",
        secure: env_config_1.default.node_env === "development" ? false : true,
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "logout successfull",
        data: null,
        statusCode: 200,
    });
});
//*change password
//*change email
//* forgot password
