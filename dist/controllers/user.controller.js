"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getbyId = exports.getall = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const apiError_utils_1 = require("../utils/apiError.utils");
//*getall user
exports.getall = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const users = await user_models_1.default.find();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "record Fetched success fully",
        statusCode: 200,
        data: user_models_1.default,
    });
});
//* getbyId
exports.getbyId = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const user = await user_models_1.default.findById({ id });
    if (!user) {
        throw new apiError_utils_1.apiError("User is not found", 400);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "user fetched successfully",
        statusCode: 200,
        data: user,
    });
});
//*get all admin
//* update
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { full_name, email, password, phone } = req.body;
    const user = user_models_1.default.findByIdAndUpdate(id, { full_name, email, password, phone }, { new: true });
    if (!user) {
        throw new apiError_utils_1.apiError("user is not found", 400);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "User updated successfully",
        statusCode: 200,
        data: user,
    });
});
//*deleted
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const user = user_models_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new apiError_utils_1.apiError("user is not found", 400);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "removed successfully",
        statusCode: 200,
        data: null,
    });
});
