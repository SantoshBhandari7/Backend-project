
import mongoose from "mongoose";
import { imageSchema } from "./image.models";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,"name is required"],
      trim: true,
      unique: [true, "duplicate name"],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type:imageSchema,
      required:[true, "image is required"],
    },
  },
  {
    timestamps: true,
  }
);

 const Category= mongoose.model("Category", categorySchema);
 export default Category;
 
