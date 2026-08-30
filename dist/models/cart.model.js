"use strict";
//{user:id , items:[{product:id, quantity:number},{product:id, quantity:number}]}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user id is required"],
    },
    items: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "product",
                required: [true, "product id is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                default: 1,
                min: [1, "qunatity must be 1 in cart"],
            },
        },
    ],
}, { timestamps: true });
const Cart = mongoose_1.default.model("cart", cartSchema);
exports.default = Cart;
