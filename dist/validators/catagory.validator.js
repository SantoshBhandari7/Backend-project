"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryQuerySchema = exports.getcategoryByIdSchema = exports.deletecategorySchema = exports.updatecategorySchema = exports.createCategorySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            error: (issue) => issue.input === null ? "name is required" : "name must be string",
        })
            .trim()
            .min(3, "name must be 3 characters long")
            .max(100, "name must not exceed 100 character")
            .refine((val) => !zod_1.z.regexes.number.test(val), "name must be string"),
        description: zod_1.z
            .string({
            error: (issue) => issue.input === null ? "price is required" : "price must be Number",
        })
            .min(25, "description must be 25 character along")
            .max(500, "description donot exceeds than 500"),
    }),
});
exports.updatecategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            error: "name must be string",
        })
            .min(3, "name must  3 be characters along")
            .max(100, "name shold not exceed than 100 characters")
            .trim(),
        description: zod_1.z
            .string({
            error: "description must be string",
        })
            .min(100, "description must be 100 character along")
            .max(400, "description donot must be 400 character along"),
    }),
});
exports.deletecategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.getcategoryByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.categoryQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        query: zod_1.z.string().optional(),
    }),
});
