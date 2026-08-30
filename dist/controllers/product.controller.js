"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getbyId = exports.getall = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const apiError_utils_1 = require("../utils/apiError.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const getPagination_util_1 = require("../utils/getPagination.util");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const folder = "/collection";
exports.getall = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, category, brand, order = "DESC", sortBy = "createdAt", page = 1, limit = 10, minPrice, maxPrice, } = req.query;
    const filter = {};
    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $option: "i",
                },
            },
            {
                description: {
                    $regex: query,
                    $optionL: "i",
                },
            },
        ];
    }
    if (category) {
        filter.category = category;
    }
    if (brand) {
        filter.brand = brand;
    }
    const products = await product_model_1.default.find(filter).populate("brand", "name").populate("category", "name")
        .limit(perPage)
        .skip(skip)
        .sort({
        [sortBy]: order === "DESC" ? -1 : 1,
    });
    const total_count = await product_model_1.default.countDocuments(filter);
    res.status(200).json({
        message: "products fetched successfully",
        status: "success",
        success: true,
        data: {
            products,
            pagination: (0, getPagination_util_1.getPagination)(total_count, perPage, currentPage),
        },
    });
});
exports.getbyId = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product) {
        throw new apiError_utils_1.apiError("product is not found", 404);
    }
    res.status(201).json({
        message: "product fetch",
        status: "success",
        success: true,
        data: product,
    });
});
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, price, stock, brand, category, description, new_arrival } = req.body;
    const { cover_image, images } = req.files;
    if (!cover_image[0]) {
        throw new apiError_utils_1.apiError("cover_image is not found", 400);
    }
    const product = await product_model_1.default.findOne({ name });
    if (product) {
        throw new apiError_utils_1.apiError(`product ${name} is already exits`, 400);
    }
    const newProduct = new product_model_1.default({
        name,
        price,
        stock,
        brand,
        category,
        description,
        new_arrival,
    });
    //*upload cover_images
    const { path, public_id } = await (0, cloudinary_utils_1.upload)(cover_image[0], folder);
    newProduct.cover_image = {
        path,
        public_id,
    };
    //*upload images
    if (images && images.length > 0) {
        const promise = images.map((file) => (0, cloudinary_utils_1.upload)(file, folder));
        const files = await Promise.allSettled(promise);
        const fullFilled = files.filter((d) => d.status === "fulfilled");
        newProduct.set("images", fullFilled);
    }
    await newProduct.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "product created successfully",
        data: product,
        statusCode: 201,
    });
});
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category, brand, description, stock, new_arrival } = req.body;
    const { cover_image, images } = req.files;
    // const {cover_image, images} = req.files as {[field:string]}
    const { delete_images } = req.body;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product) {
        throw new apiError_utils_1.apiError(` Product  isnot found`, 500);
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (category)
        product.category = category;
    if (description)
        product.description = description;
    if (stock)
        product.stock = stock;
    if (new_arrival)
        product.new_arrival = new_arrival;
    //*delete and upload cover_images
    if (cover_image && cover_image[0]) {
        (0, cloudinary_utils_1.removeFile)(product.cover_image.public_id);
        const { path, public_id } = await (0, cloudinary_utils_1.upload)(cover_image[0], folder);
        product.cover_image = {
            path,
            public_id,
        };
    }
    //*delete images
    if (delete_images &&
        Array.isArray(delete_images) &&
        delete_images.length > 0) {
        //* delete from cloudinary
        Promise.allSettled(delete_images.map((public_id) => (0, cloudinary_utils_1.removeFile)(public_id)));
        //* remove deleted images from product
        product.images.filter((img) => !delete_images.includes(img.public_id.toString()));
    }
    //*upload new images
    if (images && images.length > 0) {
        const res = await Promise.allSettled(images.map((img) => (0, cloudinary_utils_1.upload)(img, folder)));
        const newImages = res
            .filter((img) => img.status === "fulfilled")
            .map((img) => img.value);
        product.set("images", [...product.images, ...newImages]);
    }
    await product.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: product,
        message: "products updated successfully",
        statusCode: 200,
    });
});
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product) {
        throw new apiError_utils_1.apiError("product is not found", 404);
    }
    await (0, cloudinary_utils_1.removeFile)(product.cover_image.public_id);
    if (product.images) {
        await Promise.all(product.images.map((img) => (0, cloudinary_utils_1.removeFile)(img.public_id)));
    }
    await product.deleteOne();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "product delete successfully",
        statusCode: 200,
        data: null,
    });
});
