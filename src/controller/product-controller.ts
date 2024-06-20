import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";
import { generateSlug } from "../utils/generate-slug";
import { ExcelProductProps } from "../types";

const addProductController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const slug = generateSlug(body?.name);
    const checkSlug = await db.product.findFirst({
      where: {
        slug: slug,
      },
    });

    if (checkSlug) {
      return sendResponse(res, 400, "Slug is already exist");
    }

    const product = await db.product.create({
      data: {
        name: body?.name,
        slug: slug,
        productCode: body?.productCode,
        stockQty: body?.stockQty,
        supplierId: body?.supplierId,
        warehouseId: body?.warehouseId,
        brandId: body?.brandId,
        categoryId: body?.categoryId,
        unitId: body?.unitId,
        productCost: body?.productCost,
        productPrice: body?.productPrice,
        alertQty: body?.alertQty,
        productTax: body?.productTax,
        taxMethod: body?.taxMethod,
        productImages: body?.productImages,
        productThumbnail: body?.productThumbnail,
        productDetails: body?.productDetails,
        status: body?.status,
      },
    });

    return sendResponse(res, 200, "Create product successfully", product);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_PRODUCT]: Internal Error",
      error?.message
    );
  }
};

const getAllProductController = async (req: Request, res: Response) => {
  try {
    const product = await db.product.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        status: {
          not: "DELETED",
        },
      },
    });

    if (!product) {
      return sendResponse(res, 400, "Product not found!");
    }

    return sendResponse(res, 200, "Get all product successfully", product);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ALL_PRODUCT]: Internal Error",
      error?.message
    );
  }
};

const createBulkProductsController = async (req: Request, res: Response) => {
  try {
    const body = req?.body;
    console.log({ body });
    let products = [];

    for (const product of body?.products) {
      const newProduct = await addProduct(product);
      products.push(newProduct);
    }

    return sendResponse(res, 200, "Create Bulk product successfully", products);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_BULK_PRODUCT]: Internal Error",
      error?.message
    );
  }
};

const addProduct = async (data: ExcelProductProps) => {
  try {
    const slug = generateSlug(data?.name);
    const checkSlug = await db.product.findFirst({
      where: {
        slug: slug,
      },
    });

    if (checkSlug) {
      return {
        title: data.name,
        status_upload: "Error",
      };
    }

    const product = await db.product.create({
      data: {
        name: data?.name,
        slug: slug,
        productCode: data?.productCode,
        stockQty: data?.stockQty,
        supplierId: data?.supplierId,
        warehouseId: data?.warehouseId,
        brandId: data?.brandId,
        categoryId: data?.categoryId,
        unitId: data?.unitId,
        productCost: data?.productCost,
        productPrice: data?.productPrice,
        alertQty: data?.alertQty,
        productTax: data?.productTax,
        taxMethod: data?.taxMethod,
        productImages: data?.productImages,
        productThumbnail: data?.productThumbnail,
        productDetails: data?.productDetails,
        status: data?.status,
      },
    });

    return product;
  } catch (error: any) {
    return null;
  }
};

const deleteProductByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Product Id not found");
    }

    const product = await db.product.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return sendResponse(res, 400, "Product not found");
    }

    const deleteProduct = await db.product.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(res, 200, "Delete product successfully", deleteProduct);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_PRODUCT]: Internal Error",
      error?.message
    );
  }
};

const getProductByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Product Id not found");
    }

    const product = await db.product.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return sendResponse(res, 400, "Product not found");
    }

    return sendResponse(res, 200, "Get product by id successfully", product);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_PRODUCT_BY_ID]: Internal Error",
      error?.message
    );
  }
};

const updateProductByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Product Id not found");
    }

    const product = await db.product.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return sendResponse(res, 400, "Product not found");
    }

    const slug = generateSlug(body?.name);
    const checkSlug = await db.product.findFirst({
      where: {
        slug: slug,
        NOT: {
          id: params.id, // Exclude the current product from the check
        },
      },
    });

    if (checkSlug) {
      return sendResponse(res, 400, "Slug is already exist");
    }

    const productUpdate = await db.product.update({
      where: {
        id: params.id,
      },
      data: {
        name: body?.name,
        slug: slug,
        productCode: body?.productCode,
        stockQty: body?.stockQty,
        supplierId: body?.supplierId,
        warehouseId: body?.warehouseId,
        brandId: body?.brandId,
        categoryId: body?.categoryId,
        unitId: body?.unitId,
        productCost: body?.productCost,
        productPrice: body?.productPrice,
        alertQty: body?.alertQty,
        productTax: body?.productTax,
        taxMethod: body?.taxMethod,
        productImages: body?.productImages,
        productThumbnail: body?.productThumbnail,
        productDetails: body?.productDetails,
        status: body?.status,
      },
    });

    return sendResponse(
      res,
      200,
      "Update product by id successfully",
      productUpdate
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[UPDATE_PRODUCT_BY_ID]: Internal Error",
      error?.message
    );
  }
};

export {
  addProductController,
  getAllProductController,
  createBulkProductsController,
  deleteProductByIdController,
  getProductByIdController,
  updateProductByIdController,
};
