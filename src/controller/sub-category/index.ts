import { Request, Response } from "express";
import { generateSlug, sendResponse } from "../../utils";
import { db } from "../../lib";
import { ExcelSubCategoryProps } from "../../types";
import expressAsyncHandler from "express-async-handler";

//----------------------------------------------
// add sub category
//----------------------------------------------
const addSubCategoryController = expressAsyncHandler(
  async (req: any, res: any) => {
    const body = req?.body;

    try {
      const slug = await generateSlug(body?.title);
      const checkSlug = await db.subCategory.findFirst({
        where: {
          slug: slug,
        },
      });

      if (checkSlug) {
        return sendResponse(res, 400, "Slug is already exist");
      }

      const category = await db.subCategory.create({
        data: {
          title: body?.title,
          slug: slug,
          categoryId: body?.categoryId,
        },
      });

      return sendResponse(
        res,
        200,
        "Create Sub category successfully",
        category
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[CREATE_SUB_CATEGORY]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// get all sub category
//----------------------------------------------
const getAllSubCategoryController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const subCategory = await db.subCategory.findMany({
        orderBy: {
          updatedAt: "desc",
        },
      });

      if (!subCategory) {
        return sendResponse(res, 400, "Sub category not found!");
      }

      return sendResponse(
        res,
        200,
        "Get all sub category successfully",
        subCategory
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_ALL_SUB_CATEGORY]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// create bulk sub category
//----------------------------------------------
const createBulkSubCategoryController = expressAsyncHandler(
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
        "Create Bulk sub category successfully",
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

const addCategory = async (data: ExcelSubCategoryProps) => {
  try {
    const slug = await generateSlug(data?.title);
    const checkSlug = await db.subCategory.findFirst({
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

    const category = await db.subCategory.create({
      data: {
        title: data?.title,
        slug: slug,
        categoryId: data?.categoryId,
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
// delete sub category by id
//----------------------------------------------
const deleteSubCategoryByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Sub Category Id not found");
      }

      const category = await db.subCategory.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!category) {
        return sendResponse(res, 400, "Sub category not found");
      }

      const deleteCategory = await db.subCategory.delete({
        where: {
          id: params.id,
        },
      });

      return sendResponse(
        res,
        200,
        "Delete sub category successfully",
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
// get sub category by id
//----------------------------------------------
const getSubCategoryByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Sub category Id not found");
      }

      const category = await db.subCategory.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!category) {
        return sendResponse(res, 400, "Sub category not found");
      }

      return sendResponse(
        res,
        200,
        "Get sub category by id successfully",
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
// update sub category by id
//----------------------------------------------
const updateSubCategoryByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    const body = req?.body;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Sub category Id not found");
      }

      const category = await db.subCategory.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!category) {
        return sendResponse(res, 400, "Sub category not found");
      }

      const slug = await generateSlug(body?.title);
      const checkSlug = await db.subCategory.findFirst({
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

      const categoryUpdate = await db.subCategory.update({
        where: {
          id: params.id,
        },
        data: {
          title: body?.title,
          slug: slug,
          categoryId: body?.categoryId,
        },
      });

      return sendResponse(
        res,
        200,
        "Update sub category by id successfully",
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
  addSubCategoryController,
  getAllSubCategoryController,
  createBulkSubCategoryController,
  deleteSubCategoryByIdController,
  getSubCategoryByIdController,
  updateSubCategoryByIdController,
};
