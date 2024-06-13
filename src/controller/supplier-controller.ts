import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";
import { generateSlug } from "../utils/generate-slug";
import { ExcelSupplierProps } from "../types";

const addSupplierController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const checkSupplierExist = await db.supplier.findFirst({
      where: {
        email: body?.email,
      },
    });

    if (checkSupplierExist) {
      return sendResponse(res, 400, "Email is already exist");
    }

    const supplier = await db.supplier.create({
      data: {
        name: body?.name,
        companyName: body?.companyName,
        vatNumber: body?.vatNumber,
        imageUrl: body?.imageUrl,
        address: body?.address,
        email: body?.email,
        phone: body?.phone,
        country: body?.country,
        state: body?.state,
        city: body?.city,
        postalCode: body?.postalCode,
        status: body?.status,
      },
    });

    return sendResponse(res, 200, "Create supplier successfully", supplier);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_SUPPLIER]: Internal Error",
      error?.message
    );
  }
};

const getAllSupplierController = async (req: Request, res: Response) => {
  try {
    const supplier = await db.supplier.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      // where: {
      //   status: {
      //     not: "DELETED",
      //   },
      // },
    });

    if (!supplier) {
      return sendResponse(res, 400, "Supplier not found!");
    }

    return sendResponse(res, 200, "Get all supplier successfully", supplier);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ALL_SUPPLIER]: Internal Error",
      error?.message
    );
  }
};

const createBulkSuppliersController = async (req: Request, res: Response) => {
  try {
    const body = req?.body;

    let suppliers = [];

    for (const supplier of body?.suppliers) {
      const newSupplier = await addSupplier(supplier);
      suppliers.push(newSupplier);
    }

    return sendResponse(
      res,
      200,
      "Create Bulk supplier successfully",
      suppliers
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_BULK_SUPPLIER]: Internal Error",
      error?.message
    );
  }
};

const addSupplier = async (data: ExcelSupplierProps) => {
  try {
    const checkSupplierExist = await db.supplier.findFirst({
      where: {
        email: data?.email,
      },
    });

    if (checkSupplierExist) {
      return {
        name: data.name,
        status_upload: "Error",
      };
    }

    const supplier = await db.supplier.create({
      data: {
        name: data?.name,
        companyName: data?.companyName,
        vatNumber: data?.vatNumber,
        imageUrl: data?.imageUrl,
        address: data?.address,
        email: data?.email,
        phone: data?.phone,
        country: data?.country,
        state: data?.state,
        city: data?.city,
        postalCode: data?.postalCode,
        status: data?.status,
      },
    });

    return supplier;
  } catch (error: any) {
    return null;
  }
};

const deleteSupplierByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Supplier Id not found");
    }

    const supplier = await db.supplier.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!supplier) {
      return sendResponse(res, 400, "Supplier not found");
    }

    const deleteSupplier = await db.supplier.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(
      res,
      200,
      "Delete supplier successfully",
      deleteSupplier
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_SUPPLIER]: Internal Error",
      error?.message
    );
  }
};

const getSupplierByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Supplier Id not found");
    }

    const supplier = await db.supplier.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!supplier) {
      return sendResponse(res, 400, "Supplier not found");
    }

    return sendResponse(res, 200, "Get supplier by id successfully", supplier);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_SUPPLIER_BY_ID]: Internal Error",
      error?.message
    );
  }
};

const updateSupplierByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Supplier Id not found");
    }

    const supplier = await db.supplier.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!supplier) {
      return sendResponse(res, 400, "Supplier not found");
    }

    // const slug = generateSlug(body?.name);
    // const checkSlug = await db.supplier.findFirst({
    //   where: {
    //     slug: slug,
    //     NOT: {
    //       id: params.id, // Exclude the current supplier from the check
    //     },
    //   },
    // });

    // if (checkSlug) {
    //   return sendResponse(res, 400, "Slug is already exist");
    // }

    const supplierUpdate = await db.supplier.update({
      where: {
        id: params.id,
      },
      data: {
        name: body?.name,
        companyName: body?.companyName,
        vatNumber: body?.vatNumber,
        imageUrl: body?.imageUrl,
        address: body?.address,
        email: body?.email,
        phone: body?.phone,
        country: body?.country,
        state: body?.state,
        city: body?.city,
        postalCode: body?.postalCode,
        status: body?.status,
      },
    });

    return sendResponse(
      res,
      200,
      "Update supplier by id successfully",
      supplierUpdate
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[UPDATE_SUPPLIER_BY_ID]: Internal Error",
      error?.message
    );
  }
};

export {
  addSupplierController,
  getAllSupplierController,
  createBulkSuppliersController,
  deleteSupplierByIdController,
  getSupplierByIdController,
  updateSupplierByIdController,
};
