"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const router = express_1.default.Router();
router.get("/", cart_controller_1.getById);
router.post("/", cart_controller_1.createCart);
router.put("/:productId", cart_controller_1.updateCart);
router.delete("/:productId", cart_controller_1.removeCart);
exports.default = router;
