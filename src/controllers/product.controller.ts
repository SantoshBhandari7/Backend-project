import Product from "../models/product.model";
import { apiError } from "../utils/apiError.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { removeFile, upload } from "../utils/cloudinary.utils";
import { getPagination } from "../utils/getPagination.util";
import { sendResponse } from "../utils/sendResponse.utils";
import { Request, Response, NextFunction } from "express";

const folder = "/collection";

export const getall = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      query,
      category,
      brand,
      order = "DESC",
      sortBy = "createdAt",
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
    } = req.query;
    const filter: any = {};
    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);
    if (query) {
      filter.$or = [
        {
          name: {
            $regex: query,
            $option: "i",
          },
        },
        {
          description: {
            $regex: query,
            $optionL: "i",
          },
        },
      ];
    }
    if (category) {
      filter.category = category;
    }
    if (brand) {
      filter.brand = brand;
    }

    const products = await Product.find(filter).populate("brand", "name").populate("category", "name")
      .limit(perPage)
      .skip(skip)
      .sort({
        [sortBy as string]: order === "DESC" ? -1 : 1,
      });
    const total_count = await Product.countDocuments(filter);

    res.status(200).json({
      message: "products fetched successfully",
      status: "success",
      success: true,
      data: {
        products,
        pagination: getPagination(total_count, perPage, currentPage),
      },
    });
  },
);
export const getbyId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id }).populate("brand", "name").populate("category", "name");
    if (!product) {
      throw new apiError("product is not found", 404);
    }
    res.status(201).json({
      message: "product fetch",
      status: "success",
      success: true,
      data: product,
    });
  },
);

export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, stock, brand, category, description, new_arrival } =
      req.body;
    const { cover_image, images } = req.files as {
      cover_image: Express.Multer.File[];
      images: Express.Multer.File[];
    };

    if (!cover_image[0]) {
      throw new apiError("cover_image is not found", 400);
    }

    const product = await Product.findOne({ name });
    if (product) {
      throw new apiError(`product ${name} is already exits`, 400);
    }
    const newProduct = new Product({
      name,
      price,
      stock,
      brand,
      category,
      description,
      new_arrival,
    });
    //*upload cover_images
    const { path, public_id } = await upload(cover_image[0], folder);
    newProduct.cover_image = {
      path,
      public_id,
    };
    //*upload images
    if (images && images.length > 0) {
      const promise = images.map((file) => upload(file, folder));
      const files = await Promise.allSettled(promise);
      const fullFilled = files.filter((d) => d.status === "fulfilled");
      newProduct.set("images", fullFilled);
    }

    await newProduct.save();
    sendResponse(res, {
      message: "product created successfully",
      data: product,
      statusCode: 201,
    });
  },
);

export const update = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, price, category, brand, description, stock, new_arrival } =
      req.body;
    const { cover_image, images } = req.files as {
      cover_image: Express.Multer.File[];
      images: Express.Multer.File[];
    };

    // const {cover_image, images} = req.files as {[field:string]}
    const { delete_images } = req.body;

    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw new apiError(` Product  isnot found`, 500);
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (description) product.description = description;
    if (stock) product.stock = stock;
    if (new_arrival) product.new_arrival = new_arrival;

    //*delete and upload cover_images

    if (cover_image && cover_image[0]) {
      removeFile(product.cover_image.public_id);
      const { path, public_id } = await upload(cover_image[0], folder);
      product.cover_image = {
        path,
        public_id,
      };
    }

    //*delete images
    if (
      delete_images &&
      Array.isArray(delete_images) &&
      delete_images.length > 0
    ) {
      //* delete from cloudinary
      Promise.allSettled(
        delete_images.map((public_id) => removeFile(public_id)),
      );
      //* remove deleted images from product
      product.images.filter(
        (img) => !delete_images.includes(img.public_id.toString()),
      ) as any;
    }

    //*upload new images
    if (images && images.length > 0) {
      const res = await Promise.allSettled(
        images.map((img) => upload(img, folder)),
      );
      const newImages = res
        .filter((img) => img.status === "fulfilled")
        .map((img) => img.value);

      product.set("images", [...product.images, ...newImages]);
    }
    await product.save();

    sendResponse(res, {
      data: product,
      message: "products updated successfully",
      statusCode: 200,
    });
  },
);

export const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw new apiError("product is not found", 404);
    }

    await removeFile(product.cover_image.public_id);

    if (product.images) {
      await Promise.all(product.images.map((img) => removeFile(img.public_id)));
    }
    await product.deleteOne();

    sendResponse(res, {
      message: "product delete successfully",
      statusCode: 200,
      data: null,
    });
  },
);
