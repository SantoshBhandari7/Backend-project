import express from "express";
import {
  getall,
  getbyId,
  create,
  update,
  remove,
} from "../controllers/brands.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  brandQuerySchema,
  createBrandSchema,
  deleteBrandSchema,
  getBrandByIdSchema,
  updateBrandSchema,
} from "../validators/brand.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/", validate(brandQuerySchema), getall);

router.get("/:id", validate(getBrandByIdSchema), getbyId);

router.post(
  "/",
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  validate(createBrandSchema),
  create,
);

router.put("/:id", validate(updateBrandSchema), update);

router.delete("/:id", validate(deleteBrandSchema), remove);

export default router;
