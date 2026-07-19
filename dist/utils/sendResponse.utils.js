"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, { data, message, statusCode }) => {
    res.status(statusCode).json({
        message,
        data,
        success: String(statusCode).startsWith("2"),
        status: String(statusCode).startsWith("2") ? "success" : String(statusCode).startsWith("2") ? "fails" : "error",
    });
};
exports.sendResponse = sendResponse;
