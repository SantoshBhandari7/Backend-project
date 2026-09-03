import {
  NextFunction,
  Request,
  RequestHandler,
  response,
  Response,
} from "express";
import User from "../models/user.models";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { apiError } from "../utils/apiError.utils";

//*getall user
export const getall = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    sendResponse(res, {
      message: "record Fetched success fully",
      statusCode: 200,
      data: users,
    });
  },
);

//* getbyId

export const getbyId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findById({ id });

    if (!user) {
      throw new apiError("User is not found", 400);
    }
    sendResponse(res, {
      message: "user fetched successfully",
      statusCode: 200,
      data: user,
    });
  },
);

//*get all admin

//* update

export const update = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { full_name, email, password, phone } = req.body;

    const user = User.findByIdAndUpdate(
      id,
      { full_name, email, password, phone },
      { new: true },
    );
    if (!user) {
      throw new apiError("user is not found", 400);
    }

    sendResponse(res, {
      message: "User updated successfully",
      statusCode: 200,
      data: user,
    });
  },
);
//*deleted

export const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = User.findByIdAndDelete(id);

    if (!user) {
      throw new apiError("user is not found", 400);
    }
    sendResponse(res, {
      message: "removed successfully",
      statusCode: 200,
      data: null,
    });
  },
);
