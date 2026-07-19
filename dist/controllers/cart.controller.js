"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCart = exports.updateCart = exports.createCart = exports.getById = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const cart_model_1 = __importDefault(require("../models/cart.model"));
const apiError_utils_1 = require("../utils/apiError.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId } = req.params;
    const carts = await cart_model_1.default.findOne({ user: userId });
    if (!carts) {
        throw new apiError_utils_1.apiError("cart not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "card fetch successfully",
        data: carts,
        statusCode: 200,
    });
});
exports.createCart = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId, productId, quantity } = req.body;
    const product = await product_model_1.default.findById(productId);
    if (!product) {
        throw new apiError_utils_1.apiError("product is bot found", 404);
    }
    let cart = await cart_model_1.default.findOne({ user: userId });
    if (!cart) {
        cart = new cart_model_1.default({ user: userId, items: [] });
    }
    const item = cart.items.find((item) => item.product.toString() === productId);
    if (item) {
        item.quantity += quantity;
    }
    else {
        cart.items.push({
            product: productId,
            quantity,
            price: product.price,
        });
    }
    await cart.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Products are added to cart",
        data: cart,
        statusCode: 201,
    });
});
exports.updateCart = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId, quantity, productId } = req.body;
    const cart = await cart_model_1.default.findOne({ user: userId });
    if (!cart) {
        throw new apiError_utils_1.apiError("Cart is not found", 404);
    }
    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) {
        throw new apiError_utils_1.apiError("Product not found in cart", 404);
    }
    item.quantity = quantity;
    await item.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Cart updated success",
        data: cart,
        statusCode: 200,
    });
});
exports.removeCart = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId, prodcutId } = req.body;
    const cart = await cart_model_1.default.findById({ user: userId });
    if (!cart) {
        throw new apiError_utils_1.apiError("Cart is not found", 404);
    }
    const item = cart.items.filter((item) => item.product.toString() !== prodcutId);
    await cart.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "cart is deleted",
        data: cart,
        statusCode: 200,
    });
});
