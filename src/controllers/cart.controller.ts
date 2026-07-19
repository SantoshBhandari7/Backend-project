import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Cart from "../models/cart.model";
import { apiError } from "../utils/apiError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import Product from "../models/product.model";

export const getById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const carts = await Cart.findOne({ user: userId });
    if (!carts) {
      throw new apiError("cart not found", 404);
    }

    sendResponse(res, {
      message: "card fetch successfully",
      data: carts,
      statusCode: 200,
    });
  },
);

export const createCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      throw new apiError("product is bot found", 404);
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();

    sendResponse(res, {
      message: "Products are added to cart",
      data: cart,
      statusCode: 201,
    });
  },
);

export const updateCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, quantity, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new apiError("Cart is not found", 404);
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      throw new apiError("Product not found in cart", 404);
    }

    item.quantity = quantity;
    await item.save();

    sendResponse(res, {
      message: "Cart updated success",
      data: cart,
      statusCode: 200,
    });
  },
);

export const removeCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, prodcutId } = req.body;

    const cart = await Cart.findById({ user: userId });

    if (!cart) {
      throw new apiError("Cart is not found", 404);
    }

    const item = cart.items.filter(
      (item) => item.product.toString() !== prodcutId,
    );


    await cart.save();

    sendResponse(res, {
      message: "cart is deleted",
      data: cart,
      statusCode: 200,
    });
  },
);
