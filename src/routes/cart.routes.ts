
import exprss from "express";
import { createCart, getById, removeCart, updateCart } from "../controllers/cart.controller";

const router = exprss.Router();

router.get("/", getById);

router.post("/", createCart);

router.put("/:productId", updateCart);

router.delete("/:productId", removeCart);

export default router;