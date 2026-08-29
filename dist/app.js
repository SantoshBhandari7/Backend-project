"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorhandler_middleware_1 = require("./middlewares/errorhandler.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const brands_routes_1 = __importDefault(require("./routes/brands.routes"));
const apiError_utils_1 = require("./utils/apiError.utils");
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist.routes"));
//* app instanceqdc 
const app = (0, express_1.default)();
const allowedOrigins = process.env.ORIGINS?.split(',') ?? [];
//* using middleware
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true
}));
//* using middleware
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "server is running",
        success: true,
        status: "success",
        data: null,
    });
});
//*using routes
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/brands", brands_routes_1.default);
app.use("/api/v1/products", product_routes_1.default);
app.use("/api/v1/categories", category_routes_1.default);
app.use("/api/v1/wishlists", wishlist_routes_1.default);
app.use("/api/v1/carts", cart_routes_1.default);
//*  error routes
app.use((req, res, next) => {
    const error = new apiError_utils_1.apiError(`Cannot get ${req.method} on ${req.path}`, 404);
    error.statusCode = 404;
    error.status = "fails";
    next(error);
});
//*error handler
app.use(errorhandler_middleware_1.errorHandler);
exports.default = app;
