
import exprss from "express";
import { createCart, getById, removeCart, updateCart } from "../controllers/cart.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = exprss.Router();

router.get("/", authenticate([Role.USER]), getById);

router.post("/", authenticate([Role.USER]), createCart);

router.put("/:productId", authenticate([Role.USER]), updateCart);

router.delete("/:productId", authenticate([Role.USER]), removeCart);
export default router;