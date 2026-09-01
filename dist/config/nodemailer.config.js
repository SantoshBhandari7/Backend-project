"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySMTPconnection = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("./env.config"));
// console.log(ENV_CONFIG.smtp_host);
console.log(env_config_1.default.smtp_port);
// console.log(ENV_CONFIG.smtp_service);
// console.log(ENV_CONFIG.smtp_user);
// console.log(ENV_CONFIG.smtp_pass);
const transpoter = nodemailer_1.default.createTransport({
    host: env_config_1.default.smtp_host,
    service: env_config_1.default.smtp_service,
    port: env_config_1.default.smtp_port,
    secure: env_config_1.default.smtp_port === 587,
    auth: {
        user: env_config_1.default.smtp_user,
        pass: env_config_1.default.smtp_pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});
const verifySMTPconnection = async () => {
    try {
        await transpoter.verify();
        console.log("Server is ready to take our messages");
    }
    catch (err) {
        console.error("Verification failed", err);
    }
};
exports.verifySMTPconnection = verifySMTPconnection;
exports.default = transpoter;
