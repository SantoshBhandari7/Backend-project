
import express from "express";
import { createWish, getWishList, removeWish } from "../controllers/wishlist.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/", authenticate([Role.USER]), getWishList);

router.post("/", authenticate([Role.USER]), createWish);

router.delete("/:productId", authenticate([Role.USER]), removeWish);

export default router;