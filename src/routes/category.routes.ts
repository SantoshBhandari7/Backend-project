import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/catagories.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { createCategorySchema } from "../validators/catagory.validator";

const router = express.Router();
const upload = uploader();
// crud routes
//* get all
router.get("/", getAll);

//* get by id
router.get("/:id", getById);

//* create
router.post(
  "/",
  upload.single("image"),
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]), validate(createCategorySchema),
  create,
);

//* update
router.put(
  "/:id",
  upload.single("image"),
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  update,
);

//* delete
router.delete("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), remove);

export default router;