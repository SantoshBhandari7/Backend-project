import { Request, Response ,NextFunction} from "express";
import Category from "../models/category.models";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { apiError } from "../utils/apiError.utils";
import { removeFile, upload } from "../utils/cloudinary.utils";
import { number } from "zod";
import { getPagination } from "../utils/getPagination.util";

//* upload folder
const folder = "/category";

// crud Category

//* get all
export const getAll = catchAsync(async (req: Request, res: Response,next:NextFunction) => {
  const {
    query,
    order = "DESC",
    sortBy = "createdAt",
    page = 1,
    limit = 10,
  } = req.query;
  const perPage = Number(limit);
  const currentPage = Number(page);
  const skip = perPage * (currentPage - 1);

  const filter: Record<string, any> = {};
  if (query) {
    filter.$or = [
      {
        name: {
          $regex: query,
          $options: "i",
        },
        description: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }

  const categories = await Category.find(filter)
    .limit(perPage)
    .skip(skip)
    .sort({
      [sortBy as string]: order === "DESC" ? -1 : 1,
    });

    const total_count = await Category.countDocuments(filter);

  //* success response
  sendResponse(res, {
    message: "all Categories fetched",
    data:{
      categories,
     pagination: getPagination(total_count, perPage, currentPage),
    },
    statusCode: 200,
  });
});

//* get by id
export const getById = catchAsync(async (req: Request, res: Response,next:NextFunction) => {
  const { id } = req.params;

  const category = await Category.findOne({ _id: id });

  if (!category) {
    throw new apiError(`Category:${id} not found`, 404);
  }
  //* success response
  sendResponse(res, {
    message: `Category:${id} fetched`,
    data: category,
    statusCode: 200,
  });
});

//* create
export const create = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
  const { name, description } = req.body;
  const file = req.file;
  if (!name) throw new apiError("name is required", 400);
  if (!file) throw new apiError("image is required", 400);

  const category = await Category.findOne({ name: name });

  if (category) {
    throw new apiError(`Category:${name} already exists`, 409);
  }

  //* creating Category instance
  const newCategory = new Category({ name, description });

  //* upload image
  const { path, public_id } = await upload(file, folder);
  newCategory.image = {
    path,
    public_id,
  };

  //* save Category
  await newCategory.save();

  //* success response
  sendResponse(res, {
    message: `Category:${name} created`,
    data: newCategory,
    statusCode: 200,
  });
});

//* update
export const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const file = req.file;

  const category = await Category.findOne({ name: name });

  if (category) {
    throw new apiError(`Category:${name} already exists`, 404);
  }

  const oldCategory = await Category.findOne({ _id: id });

  if (!oldCategory) {
    throw new apiError(`Category:${id} not found`, 404);
  }

  if (name) oldCategory.name = name;
  if (description) oldCategory.description = description;

  if (file) {
    //* delete old image
    await removeFile(oldCategory.image.public_id);
    //* upload new image

    const { path, public_id } = await upload(file, folder);
    oldCategory.image = {
      path,
      public_id,
    };
  }

  //* save Category
  await oldCategory.save();

  //* success response
  sendResponse(res, {
    message: `Category:${id} updated`,
    data: oldCategory,
    statusCode: 200,
  });
});

//* delete
export const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findOne({ _id: id });

  if (!category) {
    throw new apiError(`Category:${id} not found`, 400);
  }

  //! delete old image
  await removeFile(category.image.public_id);

  //* delete Category
  await category.deleteOne();

  //* success response
  sendResponse(res, {
    message: `Category:${id} deleted`,
    data: null,
    statusCode: 200,
  });
});
