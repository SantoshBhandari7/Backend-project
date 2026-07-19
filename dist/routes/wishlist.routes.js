"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const router = express_1.default.Router();
router.get("/get", wishlist_controller_1.getWishList);
router.post("/", wishlist_controller_1.createWish);
router.delete("/:id", wishlist_controller_1.removeWish);
exports.default = router;
