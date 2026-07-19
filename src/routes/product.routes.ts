import express from "express";
import { create, getall, getbyId, remove, update } from "../controllers/product.controller";
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { getBrandByIdSchema } from "../validators/brand.validator";
import { createProductSchema, deleteproductSchema, getproductByIdSchema, updateproductSchema } from "../validators/product.validator";

const upload = uploader();

const router = express.Router();

router.get("get", getall);
router.get("/:id",validate(getproductByIdSchema), getbyId);

router.post(
  "/",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    {
      name: "images",
      maxCount: 5,
    },
  ]),validate(createProductSchema),
  create,
);
router.put("/:id",validate(updateproductSchema), update)

router.delete("/:id",validate(deleteproductSchema), remove);

export default router;
