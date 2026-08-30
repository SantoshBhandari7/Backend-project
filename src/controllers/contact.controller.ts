import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import { apiError } from "../utils/apiError.utils";
import Contact from "../models/contact.model";
import { sendResponse } from "../utils/sendResponse.utils";


export const createContact = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
        throw new apiError("Required Fileds are missing", 404);
    }

    const value = await Contact.create({ name, email, message });
    value.save();

    sendResponse(res, {
        message: "Message sent successfully",
        data: value,
        statusCode: 201,
    })
})