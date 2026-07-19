"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const db_config_1 = require("./config/db.config");
const env_config_1 = __importDefault(require("./config/env.config"));
const nodemailer_config_1 = require("./config/nodemailer.config");
const port = env_config_1.default.port;
//*connect database
const DB_URI = env_config_1.default.db_uri;
(0, db_config_1.connectDb)(DB_URI);
app_1.default.listen(port, async () => {
    console.log(`server is running at http://localhost:${port}`);
    await (0, nodemailer_config_1.verifySMTPconnection)();
});
