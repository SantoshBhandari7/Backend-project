"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image_models_1 = require("./image.models");
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        minLength: 3,
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: 0,
    },
    stock: {
        type: Number,
        required: [true, "stock is required"],
        min: 0,
    },
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "brand is required"],
        ref: "brand",
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "category is required"],
        ref: "Category",
    },
    cover_image: {
        type: image_models_1.imageSchema,
        required: [true, "cover image is required"],
    },
    images: [
        {
            type: image_models_1.imageSchema,
            default: null,
        },
    ],
    description: {
        type: String,
        default: null,
        minLength: 30,
    },
    new_arrival: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
