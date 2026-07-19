"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const errorHandler = (error, req, res, next) => {
    const statusCode = error?.statusCode ?? 500;
    const message = error?.message ?? "Internal server error";
    const success = error?.success ?? false;
    const status = error?.status ?? "error";
    res.status(statusCode).json({
        message,
        success,
        status,
        data: null,
        stack: env_config_1.default.node_env === "development" ? error?.stack : null,
    });
};
exports.errorHandler = errorHandler;
