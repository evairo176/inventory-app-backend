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
      where: {
        status: {
          not: "DELETED",
        },
      },
    });

    if (!category) {
      return sendResponse(res, 400, "Category not found!");
    }

    return sendResponse(res, 200, "Get all category successfully", category);
  } catch (error) {
    return sendResponse(res, 500, "[GET_ALL_CATEGORY]: Internal Error", error);
  }
};

const createBulkCategoriesController = async (req: Request, res: Response) => {
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

const deleteCategoryByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Category Id not found");
    }

    const category = await db.category.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!category) {
      return sendResponse(res, 400, "Category not found");
    }

    const deleteCategory = await db.category.update({
      where: {
        id: params.id,
      },
      data: {
        status: "DELETED",
      },
    });

    return sendResponse(
      res,
      200,
      "Delete category successfully",
      deleteCategory
    );
  } catch (error) {
    return sendResponse(res, 500, "[DELETE_CATEGORY]: Internal Error", error);
  }
};

const getCategoryByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Category Id not found");
    }

    const category = await db.category.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!category) {
      return sendResponse(res, 400, "Category not found");
    }

    return sendResponse(res, 200, "Get category by id successfully", category);
  } catch (error) {
    return sendResponse(
      res,
      500,
      "[GET_CATEGORY_BY_ID]: Internal Error",
      error
    );
  }
};

const updateCategoryByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Category Id not found");
    }

    const category = await db.category.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!category) {
      return sendResponse(res, 400, "Category not found");
    }

    const slug = generateSlug(body?.title);
    const checkSlug = await db.category.findFirst({
      where: {
        slug: slug,
        NOT: {
          id: params.id, // Exclude the current category from the check
        },
      },
    });

    if (checkSlug) {
      return sendResponse(res, 400, "Slug is already exist");
    }

    const categoryUpdate = await db.category.update({
      where: {
        id: params.id,
      },
      data: {
        title: body?.title,
        description: body?.description,
        slug: slug,
        imageUrl: body?.imageUrl,
        status: body?.status,
      },
    });

    return sendResponse(
      res,
      200,
      "Update category by id successfully",
      categoryUpdate
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      "[UPDATE_CATEGORY_BY_ID]: Internal Error",
      error
    );
  }
};

export {
  addCategoryController,
  getAllCategoryController,
  createBulkCategoriesController,
  deleteCategoryByIdController,
  getCategoryByIdController,
  updateCategoryByIdController,
};
