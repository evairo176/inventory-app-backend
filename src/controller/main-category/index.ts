import { Request, Response } from "express";
import { generateSlug, sendResponse } from "../../utils";
import { db } from "../../lib";
import { ExcelMainCategoryProps } from "../../types";
import expressAsyncHandler from "express-async-handler";

//----------------------------------------------
// add main category
//----------------------------------------------
const addMainCategoryController = expressAsyncHandler(
  async (req: any, res: any) => {
    const body = req?.body;

    try {
      const slug = await generateSlug(body?.title);
      const checkSlug = await db.mainCategory.findFirst({
        where: {
          slug: slug,
        },
      });

      if (checkSlug) {
        return sendResponse(res, 400, "Slug is already exist");
      }

      const category = await db.mainCategory.create({
        data: {
          title: body?.title,
          slug: slug,
        },
      });

      return sendResponse(
        res,
        200,
        "Create Main Categories successfully",
        category
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[CREATE_MAIN_CATEGORIES]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// get all main category
//----------------------------------------------
const getAllMainCategoryController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const mainCategory = await db.mainCategory.findMany({
        orderBy: {
          updatedAt: "desc",
        },
      });

      if (!mainCategory) {
        return sendResponse(res, 400, "Main Categories not found!");
      }

      return sendResponse(
        res,
        200,
        "Get all main categories successfully",
        mainCategory
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_ALL_MAIN_CATEGORIES]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// create bulk main category
//----------------------------------------------
const createBulkMainCategoryController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const body = req?.body;

      let categories = [];

      for (const category of body?.categories) {
        const newCategory = await addCategory(category);
        categories.push(newCategory);
      }

      return sendResponse(
        res,
        200,
        "Create Bulk main category successfully",
        categories
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[CREATE_BULK_MAIN_CATEGORY]: Internal Error",
        error?.message
      );
    }
  }
);

const addCategory = async (data: ExcelMainCategoryProps) => {
  try {
    const slug = await generateSlug(data?.title);
    const checkSlug = await db.mainCategory.findFirst({
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

    const category = await db.mainCategory.create({
      data: {
        title: data?.title,
        slug: slug,
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

//----------------------------------------------
// delete main category by id
//----------------------------------------------
const deleteMainCategoryByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Category Id not found");
      }

      const category = await db.mainCategory.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!category) {
        return sendResponse(res, 400, "Main Category not found");
      }

      const deleteCategory = await db.mainCategory.delete({
        where: {
          id: params.id,
        },
      });

      return sendResponse(
        res,
        200,
        "Delete main category successfully",
        deleteCategory
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[DELETE_MAIN_CATEGORY]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// get main category by id
//----------------------------------------------
const getMainCategoryByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Main Category Id not found");
      }

      const category = await db.mainCategory.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!category) {
        return sendResponse(res, 400, "Main Category not found");
      }

      return sendResponse(
        res,
        200,
        "Get main category by id successfully",
        category
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_MAIN_CATEGORY_BY_ID]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// update main category by id
//----------------------------------------------
const updateMainCategoryByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    const body = req?.body;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Main Category Id not found");
      }

      const category = await db.mainCategory.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!category) {
        return sendResponse(res, 400, "Main Category not found");
      }

      const slug = await generateSlug(body?.title);
      const checkSlug = await db.mainCategory.findFirst({
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

      const categoryUpdate = await db.mainCategory.update({
        where: {
          id: params.id,
        },
        data: {
          title: body?.title,
          slug: slug,
        },
      });

      return sendResponse(
        res,
        200,
        "Update main category by id successfully",
        categoryUpdate
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[UPDATE_MAIN_CATEGORY_BY_ID]: Internal Error",
        error?.message
      );
    }
  }
);

export {
  addMainCategoryController,
  getAllMainCategoryController,
  createBulkMainCategoryController,
  deleteMainCategoryByIdController,
  getMainCategoryByIdController,
  updateMainCategoryByIdController,
};
