import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";
import { generateSlug } from "../utils/generate-slug";
import { ExcelCategoryProps } from "../types";

const addCategoryController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const slug = generateSlug(body?.title);
    const checkSlug = await db.category.findFirst({
      where: {
        slug: slug,
      },
    });

    if (checkSlug) {
      return sendResponse(res, 400, "Slug is already exist");
    }

    const category = await db.category.create({
      data: {
        title: body?.title,
        description: body?.description,
        status: body?.status,
        slug: slug,
        imageUrl: body?.imageUrl,
      },
    });

    return sendResponse(res, 200, "Create category successfully", category);
  } catch (error) {
    return sendResponse(res, 500, "[CREATE_CATEGORY]: Internal Error", error);
  }
};

const getAllCategoryController = async (req: Request, res: Response) => {
  try {
    const category = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!category) {
      return sendResponse(res, 400, "Category not found");
    }

    return sendResponse(res, 200, "Get all category successfully", category);
  } catch (error) {
    return sendResponse(res, 500, "[GET_ALL_CATEGORY]: Internal Error", error);
  }
};

const createBulkCategories = async (req: Request, res: Response) => {
  try {
    const body = req?.body;
    console.log({ body });
    let categories = [];

    for (const category of body?.categories) {
      const newCategory = await addCategory(category);
      categories.push(newCategory);
    }

    return sendResponse(
      res,
      200,
      "Create Bulk category successfully",
      categories
    );
  } catch (error) {
    return sendResponse(res, 500, "[GET_ALL_CATEGORY]: Internal Error", error);
  }
};

const addCategory = async (data: ExcelCategoryProps) => {
  try {
    const slug = generateSlug(data?.title);
    const checkSlug = await db.category.findFirst({
      where: {
        slug: slug,
      },
    });

    if (checkSlug) {
      return {
        title: data.title,
        status_upload: "Error",
      };
    }

    const category = await db.category.create({
      data: {
        title: data?.title,
        slug: slug,
        imageUrl: data?.image,
        status: "ACTIVE",
      },
    });

    return category;
  } catch (error) {
    return null;
  }
};

export {
  addCategoryController,
  getAllCategoryController,
  createBulkCategories,
};
