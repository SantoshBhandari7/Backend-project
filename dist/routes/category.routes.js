"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catagories_controller_1 = require("../controllers/catagories.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../@types/enum.types");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const catagory_validator_1 = require("../validators/catagory.validator");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.uploader)();
// crud routes
//* get all
router.get("/", catagories_controller_1.getAll);
//* get by id
router.get("/:id", catagories_controller_1.getById);
//* create
router.post("/", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), (0, validator_middleware_1.validate)(catagory_validator_1.createCategorySchema), upload.single("image"), catagories_controller_1.create);
//  
//* update
router.put("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), upload.single("image"), catagories_controller_1.update);
//  
//* delete
router.delete("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), catagories_controller_1.remove);
exports.default = router;
