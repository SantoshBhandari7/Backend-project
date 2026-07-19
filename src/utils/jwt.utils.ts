import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/env.config";
import { IJwtDecodedData, IPayload } from "../@types/global.types";

export const generateJwtToken = (payload: IPayload) => {
  try {
    return jwt.sign(payload,ENV_CONFIG.jwt_secrete, {
      expiresIn: (ENV_CONFIG.jwt_expires_in as any) ?? "7d",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//* verify token
export const verifyJwtToken = (token: string): IJwtDecodedData => {
  return jwt.verify(token, ENV_CONFIG.jwt_secrete) as IJwtDecodedData;
};
