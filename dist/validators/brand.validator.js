"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandQuerySchema = exports.getBrandByIdSchema = exports.deleteBrandSchema = exports.updateBrandSchema = exports.createBrandSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.createBrandSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z
            .string({
            error: (issue) => issue.input === null ? "name is reuired" : "name must be string",
        })
            .trim()
            .min(3, "name must be 3 charcaters long.")
            .max(100, "name must not exceed 100 charcaters")
            .refine((val) => !zod_1.z.regexes.number.test(val), "name must be string"),
        description: zod_1.z
            .string({
            error: "description must be string",
        })
            .min(25, "description must be 25 characters along")
            .max(500, "description must not exceed 500 characters")
            .optional(),
    }),
});
exports.updateBrandSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            error: "name is must be string",
        })
            .min(4, "Name must be 3 characters along")
            .max(90, "Name donot exceeds than 90 characters"),
        description: zod_1.z
            .string({
            error: "description must be string",
        })
            .min(25, "description must be 25 characters along")
            .max(500, "description must not exceed 500 characters")
            .optional(),
    }),
});
exports.deleteBrandSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.getBrandByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.brandQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        query: zod_1.z.string().optional(),
        order: zod_1.z.enum(["DESC", "ASC"]).default("DESC"),
        sortBy: zod_1.z.string().default("createdAt"),
    }),
});
