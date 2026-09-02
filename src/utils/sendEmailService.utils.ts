import { MailOptions } from "nodemailer/lib/json-transport";
import ENV_CONFIG from "../config/env.config";
import transpoter from "../config/nodemailer.config";

interface IMailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: any[];
}

export const sendMail = async (mailOptions: IMailOptions) => {
  const { to, html, subject, bcc, cc, attachments } = mailOptions;
  try {
    const options: MailOptions = {
      to,
      from: ENV_CONFIG.smtp_mail_from,
      html,
      subject,
    };
    if (bcc) {
      options["bcc"] = bcc;
    }
    if (cc) {
      options["cc"] = cc;
    }
    if (attachments) {
      options["attachments"] = attachments;
    }

    transpoter.sendMail(options);
  } catch (error) {
    console.log(error);
  }
};
