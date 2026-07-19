import fs from "fs";
//*upload file

import cloudinary from "../config/cloudinary.config";
import { apiError } from "./apiError.utils";

export const upload = async (file: Express.Multer.File, dir = "/") => {
  try {
    const folder = "/firstbackendproject" + dir;

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        unique_filename: true,
        folder: folder,
        transformation: {
          width: 1000,
          height: 1000,
          crop: "fill",
          fetch_format: "auto",
          format: "auto",
          gravity: "face",
        },
      },
    );

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      path: secure_url,
      public_id,
    };
  } catch (error) {
    console.log(error);
    throw new apiError("upload error", 500);
  }
};

//* delete file
export const removeFile = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    return true;
  } catch (error) {
    console.log(error);
    throw new apiError("Something went wrong", 500);
  }
};
