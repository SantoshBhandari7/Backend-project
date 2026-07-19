import { NextFunction, Request, Response } from "express";
import { Role } from "../@types/enum.types";
import { apiError } from "../utils/apiError.utils";
import { verifyJwtToken } from "../utils/jwt.utils";
import { IJwtDecodedData } from "../@types/global.types";

 console.log("Authenticate middleware called");
export const authenticate = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      //* get access token from cookie
      const access_token = req.cookies["access_token"];

      if (!access_token) {
        throw new apiError("Unauthorized, Access denied", 401);
      }
      //* validate token
      const decoded_data = verifyJwtToken(access_token);

      if (!decoded_data) {
        throw new apiError("Unauthorized, Access denied", 401);
      }

      //* check expiry
      if (decoded_data.exp * 1000 <= Date.now()) {
        throw new apiError("Unauthorized, Token is expired", 401);
      }

      //
      //* check user role
      if (roles && !roles.includes(decoded_data.role)) {
        throw new apiError("Unauthorized, Access denied", 403);
      }

      req.user = {
        _id: decoded_data._id,
        email: decoded_data.email,
        full_name: decoded_data.full_name,
        role: decoded_data.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
