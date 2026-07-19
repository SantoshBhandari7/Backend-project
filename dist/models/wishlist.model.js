"use strict";
//user:id , product:id
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const wishListSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user id is requird"],
    },
    products: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "product",
            required: [true, "product id is required"],
        },
    ],
}, { timestamps: true });
const WishList = mongoose_1.default.model("wishlist", wishListSchema);
exports.default = WishList;
