
import express from "express";
import { createWish, getWishList, removeWish } from "../controllers/wishlist.controller";

const router = express.Router();

router.get("/get",getWishList);

router.post("/",createWish);

router.delete("/:id",removeWish);

export default router;