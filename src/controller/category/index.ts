import { Request, Response } from "express";
import { generateSlug, sendResponse } from "../../utils";
import { db } from "../../lib";
import { ExcelCategoryProps } from "../../types";

const addCategoryController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const slug = await generateSlug(body?.title);
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
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_CATEGORY]: Internal Error",
      error?.message
    );
  }
};

const getAllCategoryController = async (req: Request, res: Response) => {
  try {
    const category = await db.category.findMany({
      orderBy: {
        updatedAt: "desc",
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
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ALL_CATEGORY]: Internal Error",
      error?.message
    );
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
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_BULK_CATEGORY]: Internal Error",
      error?.message
    );
  }
};

const addCategory = async (data: ExcelCategoryProps) => {
  try {
    const slug = await generateSlug(data?.title);
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
        imageUrl: data?.imageUrl,
        status: "ACTIVE",
      },
    });

    return {
      title: category.title,
      status_upload: "",
    };
  } catch (error: any) {
    return {
      title: "",
      status_upload: "",
      error: error?.message,
      data: data,
    };
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

    const deleteCategory = await db.category.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(
      res,
      200,
      "Delete category successfully",
      deleteCategory
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_CATEGORY]: Internal Error",
      error?.message
    );
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
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_CATEGORY_BY_ID]: Internal Error",
      error?.message
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

    const slug = await generateSlug(body?.title);
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
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[UPDATE_CATEGORY_BY_ID]: Internal Error",
      error?.message
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
