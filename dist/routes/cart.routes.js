"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const router = express_1.default.Router();
router.get("getall", cart_controller_1.getById);
router.post("/", cart_controller_1.createCart);
router.put("/:id", cart_controller_1.updateCart);
router.delete("/:id", cart_controller_1.removeCart);
exports.default = router;
