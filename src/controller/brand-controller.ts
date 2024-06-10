import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";
import { generateSlug } from "../utils/generate-slug";
import { ExcelBrandProps, ExcelCategoryProps } from "../types";

const addBrandController = async (req: Request, res: Response) => {
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

    const brand = await db.brand.create({
      data: {
        title: body?.title,
        status: body?.status,
        slug: slug,
        imageUrl: body?.imageUrl,
      },
    });

    return sendResponse(res, 200, "Create brand successfully", brand);
  } catch (error) {
    return sendResponse(res, 500, "[CREATE_BRAND]: Internal Error", error);
  }
};

const getAllBrandController = async (req: Request, res: Response) => {
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
      return sendResponse(res, 400, "Brand not found!");
    }

    return sendResponse(res, 200, "Get all category successfully", brand);
  } catch (error) {
    return sendResponse(res, 500, "[GET_ALL_BRAND]: Internal Error", error);
  }
};

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
  } catch (error) {
    return sendResponse(res, 500, "[CREATE_BULK_BRAND]: Internal Error", error);
  }
};

const addBrand = async (data: ExcelBrandProps) => {
  try {
    const slug = generateSlug(data?.title);
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
        imageUrl: data?.image,
        status: "ACTIVE",
      },
    });

    return brand;
  } catch (error) {
    return null;
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

    const deleteBrand = await db.brand.update({
      where: {
        id: params.id,
      },
      data: {
        status: "DELETED",
      },
    });

    return sendResponse(res, 200, "Delete brand successfully", deleteBrand);
  } catch (error) {
    return sendResponse(res, 500, "[DELETE_BRAND]: Internal Error", error);
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
  } catch (error) {
    return sendResponse(res, 500, "[GET_BRAND_BY_ID]: Internal Error", error);
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

    const slug = generateSlug(body?.title);
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
  } catch (error) {
    return sendResponse(
      res,
      500,
      "[UPDATE_BRAND_BY_ID]: Internal Error",
      error
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
