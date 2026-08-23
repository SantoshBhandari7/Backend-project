import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { apiError } from "../utils/apiError.utils";
import { Request } from "express";
import { error } from "console";
export const uploader = () => {
  const folder = "uploads/";

  const fileSize = 5 * 1024 * 1024;

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowed_extention = [".png", "peng", ".jpeg", ".jpg", ".svg", ".webp"];
    const mime_types = ["image/png", "image/peng", "image/jpg", "image/jpeg", "image/svg+xml", "image/webp"];

    const file_ext = path.extname(file.originalname);
    console.log(file);

    if (
      !mime_types.includes(file.mimetype) ||
      !allowed_extention.includes(file_ext)
    ) {
      console.log(file);
      cb(

        new apiError(
          `Invalid file format.only ${allowed_extention.join(",").replaceAll(".", "")}files are accepted.`,
          422,
        ),
      );
    } else {
      cb(null, true);
    }
  };

  //*uploads
  const upload = multer({
    storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: fileSize,
    },
  });
  return upload;
};
