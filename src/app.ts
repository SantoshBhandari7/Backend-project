import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorhandler.middleware";
import authRouters from "./routes/auth.routes";
import loginUser from "./routes/auth.routes";

//* app instance
const app = express();

//* using middleware
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "server is running",
    success: true,
    status: "success",
    data: null,
  });
});

//*using routes
app.use("/api/v1/auth",authRouters);
app.use("/api/v1/auth",loginUser);

//*  error routes
app.use((req, res, next) => {
  const error: any = new Error(`Cannot get ${req.method} on ${req.path}`);
  error.statusCode = 404;
  error.status = "fails";
  next(error);
});

//*error handler
app.use(errorHandler);

export default app;
