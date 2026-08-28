"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeWish = exports.createWish = exports.getWishList = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const wishlist_model_1 = __importDefault(require("../models/wishlist.model"));
const apiError_utils_1 = require("../utils/apiError.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
exports.getWishList = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const userId = req.user._id;
    const wishList = await wishlist_model_1.default.findOne({ user: userId }).populate("products");
    if (!wishList) {
        throw new apiError_utils_1.apiError("WishList is not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "fecth all whishlist",
        data: wishList,
        statusCode: 200,
    });
});
exports.createWish = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;
    const product = await product_model_1.default.findById(productId);
    if (!product) {
        throw new apiError_utils_1.apiError("Product is not found", 404);
    }
    let wishlist = await wishlist_model_1.default.findOne({ user: userId });
    if (!wishlist) {
        wishlist = new wishlist_model_1.default({
            user: userId,
            products: [],
        });
    }
    const exist = wishlist.products.find((item) => item.toString() === productId);
    if (exist) {
        throw new apiError_utils_1.apiError("product already exists in wishlist", 400);
    }
    wishlist.products.push(product._id);
    await wishlist.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "product added to wishlist",
        data: wishlist,
        statusCode: 201,
    });
});
exports.removeWish = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const userId = req.user._id;
    const wishlist = await wishlist_model_1.default.findOne({ user: userId });
    if (!wishlist) {
        throw new apiError_utils_1.apiError("wishlist not found", 404);
    }
    wishlist.products = [];
    await wishlist.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Wishlist deleted successfully",
        data: wishlist,
        statusCode: 200,
    });
});
