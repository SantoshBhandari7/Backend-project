"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const apiError_utils_1 = require("../utils/apiError.utils");
const contact_model_1 = __importDefault(require("../models/contact.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const sendEmailService_utils_1 = require("../utils/sendEmailService.utils");
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
const env_config_1 = __importDefault(require("../config/env.config"));
exports.createContact = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message || !subject) {
        throw new apiError_utils_1.apiError("Required Fileds are missing", 404);
    }
    const value = new contact_model_1.default({ name, email, message, subject });
    await value.save();
    (0, sendEmailService_utils_1.sendMail)({
        to: env_config_1.default.smtp_mail_from,
        subject: "Message get from user",
        html: (0, emailTemplate_utils_1.ContactEmailHtml)({
            name: value.name,
            email: value.email,
            subject: value.subject ?? "",
            message: value.message ?? "",
        })
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Message sent successfully",
        data: value,
        statusCode: 201,
    });
});
