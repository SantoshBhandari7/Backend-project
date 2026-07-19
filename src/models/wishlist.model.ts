//user:id , product:id

import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is requird"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: [true, "product id is required"],
      },
    ],
  },
  { timestamps: true },
);

const WishList = mongoose.model("wishlist", wishListSchema);
export default WishList;
