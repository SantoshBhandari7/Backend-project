import { NextFunction, Request, Response } from "express";
import ENV_CONFIG from "../config/env.config";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode: number = error?.statusCode ?? 500;
  const message: string = error?.message ?? "Internal server error";
  const success: boolean = error?.success ?? false;
  const status: "error" | "success" | "fail" = error?.status ?? "error";

  res.status(statusCode).json({
    message,
    success,
    status,
    data: null,
    stack: ENV_CONFIG.node_env === "development" ? error?.stack : null,
  });
};
