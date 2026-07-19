"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z
            .string({
            error: (issue) => issue.input === null
                ? "fullname is required "
                : "full_name must be string",
        })
            .min(3, "full_name must be 3 character long")
            .max(100, "fullname must not exced 100 character"),
        password: zod_1.z.string({
            error: (issue) => issue.input === null
                ? "password is required "
                : "password must be string",
        }),
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined ? "email is required " : "Invalid email",
        }),
    }),
    params: zod_1.z.object({}).default({}),
    query: zod_1.z.object({}).default({}),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined ? "Email is required" : "Invalid credintals"
        }),
        password: zod_1.z.string({
            error: (issue) => issue.input === null ? "password is required" : "Invalid credintals",
        })
    })
});
