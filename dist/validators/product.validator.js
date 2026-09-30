"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQuerySchema = exports.getproductByIdSchema = exports.deleteproductSchema = exports.updateproductSchema = exports.createProductSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            error: (issue) => issue.input === null ? "name is required" : "name must be string",
        })
            .min(3, "name must be 3 characters long")
            .max(100, "name should not exceed 100 characters")
            .trim(),
        price: zod_1.z.coerce
            .number({
            error: "price must be number",
        })
            .positive("price must be greater than 0"),
        stock: zod_1.z.coerce
            .number({
            error: "stock must be number",
        })
            .min(0, "stock cannot be negative"),
        brand: zod_1.z
            .string({
            error: (issue) => issue.input === null ? "Brand is required" : "brand must be string",
        })
            .min(1, "brand is required")
            .trim(),
        category: zod_1.z
            .string({
            error: (issue) => issue.input === null
                ? "category is required"
                : "category must be string",
        })
            .min(1, "category is required")
            .trim(),
        description: zod_1.z
            .string({
            error: "description is required",
        })
            .min(25, "description must be at least 25 characters")
            .trim(),
        new_arrival: zod_1.z.coerce.boolean().default(false),
    }),
});
exports.updateproductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            error: "name must be required",
        })
            .min(3, "name must be 3 character along")
            .max(100, "name shouldnot be exceds than 100")
            .trim(),
        price: zod_1.z.coerce.number().positive("price must be greater than 0"),
        stock: zod_1.z.coerce.number().min(0, "stock cannot be nagative").optional(),
        brand: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid brand id")
            .optional(),
        category: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid category id")
            .optional(),
    }),
});
exports.deleteproductSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.getproductByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.productQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        query: zod_1.z.string().optional(),
    }),
});
