"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const apiError_utils_1 = require("../utils/apiError.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
console.log("Authenticate middleware called");
const authenticate = (roles) => {
    return async (req, res, next) => {
        try {
            //* get access token from cookie
            const access_token = req.cookies["access_token"];
            if (!access_token) {
                throw new apiError_utils_1.apiError("Unauthorized, Access denied", 401);
            }
            //* validate token
            const decoded_data = (0, jwt_utils_1.verifyJwtToken)(access_token);
            if (!decoded_data) {
                throw new apiError_utils_1.apiError("Unauthorized, Access denied", 401);
            }
            //* check expiry
            if (decoded_data.exp * 1000 <= Date.now()) {
                throw new apiError_utils_1.apiError("Unauthorized, Token is expired", 401);
            }
            //
            //* check user role
            if (roles && !roles.includes(decoded_data.role)) {
                throw new apiError_utils_1.apiError("Unauthorized, Access denied", 403);
            }
            req.user = {
                _id: decoded_data._id,
                email: decoded_data.email,
                full_name: decoded_data.full_name,
                role: decoded_data.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
