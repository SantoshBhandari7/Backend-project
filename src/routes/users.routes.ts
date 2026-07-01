import  express from "express";
import { getall, getbyId, remove, update } from "../controllers/user.controller";

const router = express.Router();

router.get("/",getall);

router.get("/:id" ,getbyId);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;