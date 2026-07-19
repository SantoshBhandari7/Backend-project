"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image_models_1 = require("./image.models");
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        unique: [true, "duplicate name"],
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: image_models_1.imageSchema,
        required: [true, "image is required"],
    },
}, {
    timestamps: true,
});
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
