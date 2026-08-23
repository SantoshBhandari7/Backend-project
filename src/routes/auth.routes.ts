import express from "express";
import { getProfile, login, register } from "../controllers/auth.controller";
import multer from "multer";
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { loginSchema, registerUserSchema } from "../validators/auth.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

const upload = uploader();

//* register
router.post("/register", upload.single("profile_image"), validate(registerUserSchema), register);

//*login
router.post("/login", validate(loginSchema), login);

//*get profile
router.get("/me", authenticate(), getProfile);
export default router;
