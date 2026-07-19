//{user:id , items:[{product:id, quantity:number},{product:id, quantity:number}]}

import mongoose from "mongoose";
import { minLength, required } from "zod/mini";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "product id is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          default: 1,
          min:[1, "qunatity must be 1 in cart"],
        },
      },
    ],
  },
  { timestamps: true },
);

const Cart = mongoose.model("cart", cartSchema);
export default Cart;
