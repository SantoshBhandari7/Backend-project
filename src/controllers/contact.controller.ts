import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import { apiError } from "../utils/apiError.utils";
import Contact from "../models/contact.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { sendMail } from "../utils/sendEmailService.utils";
import { ContactEmailHtml } from "../utils/emailTemplate.utils";


export const createContact = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, message, subject } = req.body

    if (!name || !email || !message) {
        throw new apiError("Required Fileds are missing", 404);
    }

    const value = new Contact({ name, email, message });
    await value.save();

    sendMail({
        to: value.email,
        subject: "Message get from user",
        html: ContactEmailHtml({
            name: value.name,
            email: value.email,
            subject: value.subject ?? "",
            message: value.message ?? "",

        })
    })

    sendResponse(res, {
        message: "Message sent successfully",
        data: value,
        statusCode: 201,
    })
})