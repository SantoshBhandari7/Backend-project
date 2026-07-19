"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../@types/enum.types");
const image_models_1 = require("./image.models");
//using schema
const userSchema = new mongoose_1.default.Schema({
    full_name: {
        type: String,
        required: [true, "full_name is required"],
        minLength: [3, "full_name must be at least 3 character"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "user already exists with provided email"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
    },
    role: {
        type: String,
        // enum:["ADMIN","USER","SUPER ADMIN"],
        enum: Object.values(enum_types_1.Role),
        default: "USER",
    },
    profile_image: {
        type: image_models_1.imageSchema,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
//*user model
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
