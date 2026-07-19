"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const nodemailer_config_1 = __importDefault(require("../config/nodemailer.config"));
const sendMail = async (mailOption) => {
    const { to, html, subject, bcc, cc, attachments } = mailOption;
    try {
        const option = {
            to,
            from: env_config_1.default.smtp_mail_from,
            html,
            subject,
        };
        if (bcc) {
            option["bcc"] = bcc;
        }
        if (cc) {
            option["cc"] = cc;
        }
        if (attachments) {
            option["attachments"] = attachments;
        }
        nodemailer_config_1.default.sendMail(option);
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendMail = sendMail;
