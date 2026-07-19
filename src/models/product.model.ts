import mongoose, { Mongoose } from "mongoose";
import { imageSchema } from "./image.models";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "stock is required"],
      min: 0,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "brand is required"],
      ref: "brand",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "category is required"],
      ref: "Category",
    },
    cover_image: {
      type: imageSchema,
      required: [true, "cover image is required"],
    },
    images: [
      {
        type: imageSchema,
        default: null,
      },
    ],

    description: {
      type: String,
      default: null,
      minLength: 30,
    },
    new_arrival: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("product", productSchema);
export default Product;
