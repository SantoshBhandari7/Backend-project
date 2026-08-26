"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const apiError_utils_1 = require("../utils/apiError.utils");
const uploader = () => {
    const folder = "uploads/";
    const fileSize = 5 * 1024 * 1024;
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder, { recursive: true });
    }
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
            const fileName = Date.now() + "-" + file.originalname;
            cb(null, fileName);
        },
    });
    const fileFilter = (req, file, cb) => {
        const allowed_extention = [".png", "peng", ".jpeg", ".jpg", ".svg", ".webp"];
        const mime_types = ["image/png", "image/peng", "image/jpg", "image/jpeg", "image/svg+xml", "image/webp"];
        const file_ext = path_1.default.extname(file.originalname);
        console.log(file);
        if (!mime_types.includes(file.mimetype) ||
            !allowed_extention.includes(file_ext)) {
            console.log(file);
            cb(new apiError_utils_1.apiError(`Invalid file format.only ${allowed_extention.join(",").replaceAll(".", "")}files are accepted.`, 422));
        }
        else {
            cb(null, true);
        }
    };
    //*uploads
    const upload = (0, multer_1.default)({
        storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: fileSize,
        },
    });
    return upload;
};
exports.uploader = uploader;
