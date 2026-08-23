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
import { uploader } from "../middlewares/multer.middleware";

const router = express.Router();
const upload = uploader();

router.get("/", validate(brandQuerySchema), getall);

router.get("/:id", validate(getBrandByIdSchema), getbyId);

router.post(
  "/",
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  upload.single("logo"),
  validate(createBrandSchema),
  create,
);


router.put("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), upload.single("logo"), validate(updateBrandSchema), update);

router.delete("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), validate(deleteBrandSchema), remove);

export default router;
