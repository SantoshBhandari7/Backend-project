import { MailOptions } from "nodemailer/lib/json-transport";
import ENV_CONFIG from "../config/env.config";
import transpoter from "../config/nodemailer.config";

interface IMailOption {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: any[];
}

export const sendMail = async (mailOption: IMailOption) => {
  const { to, html, subject, bcc, cc,attachments } = mailOption;
  try {
    const option: MailOptions = {
      to,
      from: ENV_CONFIG.smtp_mail_from,
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
      option["attachments"] =attachments;
    }

    transpoter.sendMail(option);
  } catch (error) {
    console.log(error);
  }
};
