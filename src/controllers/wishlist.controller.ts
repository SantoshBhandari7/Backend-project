import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import WishList from "../models/wishlist.model";
import { apiError } from "../utils/apiError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import Product from "../models/product.model";

export const getWishList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user._id;

  const wishList = await WishList.findOne({ user: userId }).populate("products");

  if (!wishList) {
    throw new apiError("WishList is not found", 404);
  }

  sendResponse(res, {
    message: "fecth all whishlist",
    data: wishList,
    statusCode: 200,
  });
});

export const createWish = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);

  if (!product) {
    throw new apiError("Product is not found", 404);
  }

  let wishlist = await WishList.findOne({ user: userId });
  if (!wishlist) {
    wishlist = new WishList({
      user: userId,
      products: [],
    });
  }

  const exist = wishlist.products.find((item) => item.toString() === productId);

  if (exist) {
    throw new apiError("product already exists in wishlist", 400);
  }
  wishlist.products.push(product._id);

  await wishlist.save();

  sendResponse(res, {
    message: "product added to wishlist",
    data: wishlist,
    statusCode: 201,
  })
});

export const removeWish = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const wishlist = await WishList.findOne({ user: userId });

  if (!wishlist) {
    throw new apiError("wishlist not found", 404);
  }

  wishlist.products = wishlist.products.filter(
    (product) => product.toString() !== productId
  );

  await wishlist.save();

  sendResponse(res, {
    message: "Wishlist deleted successfully",
    data: wishlist,
    statusCode: 200,
  })
})