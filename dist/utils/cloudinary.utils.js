"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
//*upload file
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const apiError_utils_1 = require("./apiError.utils");
const upload = async (file, dir = "/") => {
    try {
        const folder = "/firstbackendproject" + dir;
        const { secure_url, public_id } = await cloudinary_config_1.default.uploader.upload(file.path, {
            unique_filename: true,
            folder: folder,
            transformation: {
                width: 1000,
                height: 1000,
                crop: "fill",
                fetch_format: "auto",
                format: "auto",
                gravity: "face",
            },
        });
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        return {
            path: secure_url,
            public_id,
        };
    }
    catch (error) {
        console.log(error);
        throw new apiError_utils_1.apiError("upload error", 500);
    }
};
exports.upload = upload;
//* delete file
const removeFile = async (public_id) => {
    try {
        await cloudinary_config_1.default.uploader.destroy(public_id);
        return true;
    }
    catch (error) {
        console.log(error);
        throw new apiError_utils_1.apiError("Something went wrong", 500);
    }
};
exports.removeFile = removeFile;
