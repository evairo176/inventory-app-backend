import { Request, Response } from "express";
import { generateSlug, sendResponse } from "../../utils";
import { db } from "../../lib";
import { ExcelBrandProps } from "../../types";
import expressAsyncHandler from "express-async-handler";

const addBrandController = expressAsyncHandler(async (req: any, res: any) => {
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

    const brand = await db.brand.create({
      data: {
        title: body?.title,
        status: body?.status,
        slug: slug,
        imageUrl: body?.imageUrl,
      },
    });

    return sendResponse(res, 200, "Create brand successfully", brand);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_BRAND]: Internal Error",
      error?.message
    );
  }
});

const getAllBrandController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const brand = await db.brand.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          status: {
            not: "DELETED",
          },
        },
      });

      if (!brand) {
        return sendResponse(res, 404, "Brand not found!");
      }

      return sendResponse(res, 200, "Get all category successfully", brand);
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_ALL_BRAND]: Internal Error",
        error?.message
      );
    }
  }
);

const createBulkBrandsController = async (req: Request, res: Response) => {
  try {
    const body = req?.body;
    console.log({ body });
    let brands = [];

    for (const brand of body?.brands) {
      const newBrand = await addBrand(brand);
      brands.push(newBrand);
    }

    return sendResponse(res, 200, "Create Bulk brand successfully", brands);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_BULK_BRAND]: Internal Error",
      error?.message
    );
  }
};

const addBrand = async (data: ExcelBrandProps) => {
  try {
    const slug = await generateSlug(data?.title);
    const checkSlug = await db.brand.findFirst({
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

    const brand = await db.brand.create({
      data: {
        title: data?.title,
        slug: slug,
        imageUrl: data?.imageUrl,
        status: "ACTIVE",
      },
    });

    return {
      title: brand.title,
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

const deleteBrandByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Brand Id not found");
    }

    const brand = await db.brand.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!brand) {
      return sendResponse(res, 400, "Brand not found");
    }

    const deleteBrand = await db.brand.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(res, 200, "Delete brand successfully", deleteBrand);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_BRAND]: Internal Error",
      error?.message
    );
  }
};

const getBrandByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Brand Id not found");
    }

    const brand = await db.brand.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!brand) {
      return sendResponse(res, 400, "Brand not found");
    }

    return sendResponse(res, 200, "Get brand by id successfully", brand);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_BRAND_BY_ID]: Internal Error",
      error?.message
    );
  }
};

const updateBrandByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Brand Id not found");
    }

    const brand = await db.brand.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!brand) {
      return sendResponse(res, 400, "Brand not found");
    }

    const slug = await generateSlug(body?.title);
    const checkSlug = await db.brand.findFirst({
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

    const brandUpdate = await db.brand.update({
      where: {
        id: params.id,
      },
      data: {
        title: body?.title,
        slug: slug,
        imageUrl: body?.imageUrl,
        status: body?.status,
      },
    });

    return sendResponse(
      res,
      200,
      "Update brand by id successfully",
      brandUpdate
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[UPDATE_BRAND_BY_ID]: Internal Error",
      error?.message
    );
  }
};

export {
  addBrandController,
  getAllBrandController,
  createBulkBrandsController,
  deleteBrandByIdController,
  getBrandByIdController,
  updateBrandByIdController,
};
