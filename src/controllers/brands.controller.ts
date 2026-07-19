import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Brand from "../models/brand.models";
import { apiError } from "../utils/apiError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { removeFile, upload } from "../utils/cloudinary.utils";
import { getPagination } from "../utils/getPagination.util";

const folder = "/uploads";
export const getall = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      query,
      order = "DESC",
      sortBy = "createdAt",
      page = 1,
      limit = 10,
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

    const brands = await Brand.find(filter)
      .limit(perPage)
      .skip(skip)
      .sort({
        [sortBy as string]: order === "DESC" ? -1 : 1,
      });

    const total_count = await Brand.countDocuments(filter);

    sendResponse(res, {
      message: "Brands fetched successfully",
      statusCode: 200,
      data: brands,
    });
  },
);

export const getbyId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const brand = await Brand.findOne({ _id: id });
    if (!brand) {
      throw new apiError("Brand is not found", 404);
    }
    res.status(201).json({
      message: "Brand fetch",
      status: "success",
      success: true,
      data: brand,
    });
  },
);

export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const file = req.file;

    const brand = await Brand.findOne({ name });
    if (!brand) {
      throw new apiError("Brand is not found", 400);
    }
    const newBrand = new Brand({ name, description });

    //* upload logo

    if (file) {
      const { path, public_id } = await upload(file, folder);
    }

    newBrand.save();

    sendResponse(res, {
      message: "brand created successfully",
      data: brand,
      statusCode: 201,
    });
  },
);

export const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const file = req.file;
  const brand = await Brand.findOne({ name: name });
  if (brand) {
    throw new apiError(`brand:${name} already exists`, 409);
  }
  const oldBrand = await Brand.findOne({ _id: id });

  if (!oldBrand) {
    throw new apiError(`brand:${id} not found`, 400);
  }

  if (name) oldBrand.name = name;
  if (description) oldBrand.description = description;

  if (file) {
    //! delete old logo
    await removeFile(oldBrand.logo.public_id);

    //* upload new logo
    const { path, public_id } = await upload(file, folder);
    oldBrand.logo = {
      path,
      public_id,
    };
  }

  //* save brand
  await oldBrand.save();

  //* success response
  sendResponse(res, {
    message: `brand:${id} updated`,
    data: oldBrand,
    statusCode: 200,
  });
});

export const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const brand = await Brand.findOne({ _id: id });
    if (!brand) {
      throw new apiError("Brand is not found", 404);
    }

    await removeFile(brand.logo.public_id);

    sendResponse(res, {
      message: "brand delete successfully",
      statusCode: 201,
      data: null,
    });
  },
);
