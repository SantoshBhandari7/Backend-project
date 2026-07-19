declare global {
  namespace Express {
    interface Request {
      user: Omit<IPayload, "iat" | "exp">;
      file?: Express.Multer.File;
      files: Express.Multer.File[];
    }
  }
}

export {};