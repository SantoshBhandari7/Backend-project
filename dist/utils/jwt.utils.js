"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
const generateJwtToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, env_config_1.default.jwt_secrete, {
            expiresIn: env_config_1.default.jwt_expires_in ?? "7d",
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.generateJwtToken = generateJwtToken;
//* verify token
const verifyJwtToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_config_1.default.jwt_secrete);
};
exports.verifyJwtToken = verifyJwtToken;
