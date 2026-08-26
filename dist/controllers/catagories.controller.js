"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const category_models_1 = __importDefault(require("../models/category.models"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const apiError_utils_1 = require("../utils/apiError.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const getPagination_util_1 = require("../utils/getPagination.util");
//* upload folder
const folder = "/category";
// crud Category
//* get all
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, order = "DESC", sortBy = "createdAt", page = 1, limit = 10, } = req.query;
    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);
    const filter = {};
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $options: "i",
                },
                description: {
                    $regex: query,
                    $options: "i",
                },
            },
        ];
    }
    const categories = await category_models_1.default.find(filter)
        .limit(perPage)
        .skip(skip)
        .sort({
        [sortBy]: order === "DESC" ? -1 : 1,
    });
    const total_count = await category_models_1.default.countDocuments(filter);
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "all Categories fetched",
        data: {
            categories,
            pagination: (0, getPagination_util_1.getPagination)(total_count, perPage, currentPage),
        },
        statusCode: 200,
    });
});
//* get by id
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const category = await category_models_1.default.findOne({ _id: id });
    if (!category) {
        throw new apiError_utils_1.apiError(`Category:${id} not found`, 404);
    }
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Category:${id} fetched`,
        data: category,
        statusCode: 200,
    });
});
//* create
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    console.log("🔥 CREATE CATEGORY CONTROLLER REACHED");
    const { name, description } = req.body;
    const file = req.file;
    if (!name)
        throw new apiError_utils_1.apiError("name is required", 400);
    if (!file)
        throw new apiError_utils_1.apiError("image is required", 400);
    const category = await category_models_1.default.findOne({ name: name });
    if (category) {
        throw new apiError_utils_1.apiError(`Category:${name} already exists`, 409);
    }
    //* creating Category instance
    const newCategory = new category_models_1.default({ name, description });
    //* upload image
    const { path, public_id } = await (0, cloudinary_utils_1.upload)(file, folder);
    newCategory.image = {
        path,
        public_id,
    };
    //* save Category
    await newCategory.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Category:${name} created`,
        data: newCategory,
        statusCode: 200,
    });
});
//* update
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;
    const category = await category_models_1.default.findOne({ name: name });
    if (category) {
        throw new apiError_utils_1.apiError(`Category:${name} already exists`, 404);
    }
    const oldCategory = await category_models_1.default.findOne({ _id: id });
    if (!oldCategory) {
        throw new apiError_utils_1.apiError(`Category:${id} not found`, 404);
    }
    if (name)
        oldCategory.name = name;
    if (description)
        oldCategory.description = description;
    if (file) {
        //* delete old image
        await (0, cloudinary_utils_1.removeFile)(oldCategory.image.public_id);
        //* upload new image
        const { path, public_id } = await (0, cloudinary_utils_1.upload)(file, folder);
        oldCategory.image = {
            path,
            public_id,
        };
    }
    //* save Category
    await oldCategory.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Category:${id} updated`,
        data: oldCategory,
        statusCode: 200,
    });
});
//* delete
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const category = await category_models_1.default.findOne({ _id: id });
    if (!category) {
        throw new apiError_utils_1.apiError(`Category:${id} not found`, 400);
    }
    //! delete old image
    await (0, cloudinary_utils_1.removeFile)(category.image.public_id);
    //* delete Category
    await category.deleteOne();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Category:${id} deleted`,
        data: null,
        statusCode: 200,
    });
});
