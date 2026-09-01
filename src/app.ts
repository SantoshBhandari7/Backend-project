import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorhandler.middleware";
import authRoutes from "./routes/auth.routes";
import loginRoutes from "./routes/auth.routes";
import ProductRoutes from "./routes/product.routes";
import brandsRoutes from "./routes/brands.routes";
import { apiError } from "./utils/apiError.utils";
import categoryRoutes from "./routes/category.routes";
import cartRoutes from "./routes/cart.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import contactRoutes from "./routes/contact.routes";
//* app instanceqdc 
const app = express();

const allowedOrigins = process.env.ORIGINS?.split(',') ?? [];

//* using middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  }))

//* using middleware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "server is running",
    success: true,
    status: "success",
    data: null,
  });
});

//*using routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/brands", brandsRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/wishlists", wishlistRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/contacts", contactRoutes);


//*  error routes
app.use((req, res, next) => {
  const error: any = new apiError(`Cannot get ${req.method} on ${req.path}`, 404);
  error.statusCode = 404;
  error.status = "fails";
  next(error);
});

//*error handler
app.use(errorHandler);

export default app;
