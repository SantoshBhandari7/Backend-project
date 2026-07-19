import mongoose from "mongoose";
import { IImage } from "../@types/global.types";
import { imageSchema } from "./image.models";

interface IBrand extends Document {
  name: string;
  description?: string;
  logo: IImage;
}



const brandSchema = new mongoose.Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      required: false,
      minLength: 32,
      default:null,
    },
    logo: {
      type:imageSchema ,
      required: [true, "logo is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Brand = mongoose.model("brand", brandSchema);
export default Brand;
