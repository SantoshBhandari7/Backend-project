"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image_models_1 = require("./image.models");
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    description: {
        type: String,
        required: false,
        minLength: 32,
        default: null,
    },
    logo: {
        type: image_models_1.imageSchema,
        required: [true, "logo is required"],
    },
}, {
    timestamps: true,
});
const Brand = mongoose_1.default.model("brand", brandSchema);
exports.default = Brand;
