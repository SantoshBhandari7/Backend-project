"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const product_validator_1 = require("../validators/product.validator");
const upload = (0, multer_middleware_1.uploader)();
const router = express_1.default.Router();
router.get("get", product_controller_1.getall);
router.get("/:id", (0, validator_middleware_1.validate)(product_validator_1.getproductByIdSchema), product_controller_1.getbyId);
router.post("/", upload.fields([
    { name: "cover_image", maxCount: 1 },
    {
        name: "images",
        maxCount: 5,
    },
]), (0, validator_middleware_1.validate)(product_validator_1.createProductSchema), product_controller_1.create);
router.put("/:id", (0, validator_middleware_1.validate)(product_validator_1.updateproductSchema), product_controller_1.update);
router.delete("/:id", (0, validator_middleware_1.validate)(product_validator_1.deleteproductSchema), product_controller_1.remove);
exports.default = router;
