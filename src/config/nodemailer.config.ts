import nodemailer from "nodemailer";
import ENV_CONFIG from "./env.config";

// console.log(ENV_CONFIG.smtp_host);

console.log(ENV_CONFIG.smtp_port);
// console.log(ENV_CONFIG.smtp_service);
// console.log(ENV_CONFIG.smtp_user);
// console.log(ENV_CONFIG.smtp_pass);


const transpoter = nodemailer.createTransport({
  host: ENV_CONFIG.smtp_host,
  service: ENV_CONFIG.smtp_service,
  port: ENV_CONFIG.smtp_port,
  secure: ENV_CONFIG.smtp_port === 587,
  auth: {
    user: ENV_CONFIG.smtp_user,
    pass: ENV_CONFIG.smtp_pass,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

})
export const verifySMTPconnection = async () => {
  try {
    await transpoter.verify();
    console.log("Server is ready to take our messages");
  } catch (err) {
    console.error("Verification failed", err);
  }
}
export default transpoter;