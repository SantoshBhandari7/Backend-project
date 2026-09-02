"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getbyId = exports.getall = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const brand_models_1 = __importDefault(require("../models/brand.models"));
const apiError_utils_1 = require("../utils/apiError.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const folder = "/uploads";
exports.getall = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, order = "DESC", sortBy = "createdAt", page = 1, limit = 10, } = req.query;
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
    const brands = await brand_models_1.default.find(filter)
        .limit(perPage)
        .skip(skip)
        .sort({
        [sortBy]: order === "DESC" ? -1 : 1,
    });
    const total_count = await brand_models_1.default.countDocuments(filter);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Brands fetched successfully",
        statusCode: 200,
        data: brands,
    });
});
exports.getbyId = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brand_models_1.default.findOne({ _id: id });
    if (!brand) {
        throw new apiError_utils_1.apiError("Brand is not found", 404);
    }
    res.status(201).json({
        message: "Brand fetch",
        status: "success",
        success: true,
        data: brand,
    });
});
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, description } = req.body;
    const file = req.file;
    console.log("BODY:", req.body);
    console.log("FILE:", file);
    if (!name)
        throw new apiError_utils_1.apiError("name is required", 400);
    const brand = await brand_models_1.default.findOne({ name: name });
    if (brand) {
        throw new apiError_utils_1.apiError(`brand:${name} already exists`, 409);
    }
    //* creating brand instance
    const newBrand = new brand_models_1.default({ name, description });
    if (file) {
        //* upload logo
        const { path, public_id } = await (0, cloudinary_utils_1.upload)(file, folder);
        newBrand.logo = {
            path,
            public_id,
        };
    }
    //* save brand
    await newBrand.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brand created successfully",
        data: newBrand,
        statusCode: 201,
    });
});
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;
    const brand = await brand_models_1.default.findOne({ name: name });
    if (brand) {
        throw new apiError_utils_1.apiError(`brand:${name} already exists`, 409);
    }
    const oldBrand = await brand_models_1.default.findOne({ _id: id });
    if (!oldBrand) {
        throw new apiError_utils_1.apiError(`brand:${id} not found`, 400);
    }
    if (name)
        oldBrand.name = name;
    if (description)
        oldBrand.description = description;
    if (file) {
        //! delete old logo
        await (0, cloudinary_utils_1.removeFile)(oldBrand.logo.public_id);
        //* upload new logo
        const { path, public_id } = await (0, cloudinary_utils_1.upload)(file, folder);
        oldBrand.logo = {
            path,
            public_id,
        };
    }
    //* save brand
    await oldBrand.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `brand:${id} updated`,
        data: oldBrand,
        statusCode: 200,
    });
});
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brand_models_1.default.findOne({ _id: id });
    if (!brand) {
        throw new apiError_utils_1.apiError("Brand is not found", 404);
    }
    await (0, cloudinary_utils_1.removeFile)(brand.logo.public_id);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brand delete successfully",
        statusCode: 201,
        data: null,
    });
});
