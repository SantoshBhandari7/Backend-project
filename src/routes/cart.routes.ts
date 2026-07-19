
import exprss from "express";
import { createCart, getById, removeCart, updateCart } from "../controllers/cart.controller";

const router = exprss.Router();

router.get("getall", getById);

router.post("/", createCart);

router.put("/:id",updateCart);

router.delete("/:id", removeCart);

export default router;