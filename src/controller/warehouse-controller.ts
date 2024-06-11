import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";
import { generateSlug } from "../utils/generate-slug";
import { ExcelWarehouseProps } from "../types";

const addWarehouseController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const slug = generateSlug(body?.name);
    const checkSlug = await db.warehouse.findFirst({
      where: {
        slug: slug,
      },
    });

    if (checkSlug) {
      return sendResponse(res, 400, "Slug is already exist");
    }

    const warehouse = await db.warehouse.create({
      data: {
        name: body?.name,
        slug: slug,
        email: body?.email,
        phone: body?.phone,
        contactPerson: body?.contactPerson,
        country: body?.country,
        city: body?.city,
        zipCode: body?.zipCode,
        status: body?.status,
        imageUrl: body?.imageUrl,
      },
    });

    return sendResponse(res, 200, "Create warehouse successfully", warehouse);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_WAREHOUSE]: Internal Error",
      error?.message
    );
  }
};

const getAllWarehouseController = async (req: Request, res: Response) => {
  try {
    const warehouse = await db.warehouse.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        status: {
          not: "DELETED",
        },
      },
    });

    if (!warehouse) {
      return sendResponse(res, 400, "Warehouse not found!");
    }

    return sendResponse(res, 200, "Get all warehouse successfully", warehouse);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ALL_WAREHOUSE]: Internal Error",
      error?.message
    );
  }
};

const createBulkWarehousesController = async (req: Request, res: Response) => {
  try {
    const body = req?.body;

    let warehouses = [];

    for (const warehouse of body?.warehouses) {
      const newWarehouse = await addWarehouse(warehouse);
      warehouses.push(newWarehouse);
    }

    return sendResponse(
      res,
      200,
      "Create Bulk warehouse successfully",
      warehouses
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_BULK_WAREHOUSE]: Internal Error",
      error?.message
    );
  }
};

const addWarehouse = async (data: ExcelWarehouseProps) => {
  try {
    const slug = generateSlug(data?.name);
    const checkSlug = await db.warehouse.findFirst({
      where: {
        slug: slug,
      },
    });

    if (checkSlug) {
      return {
        name: data.name,
        status_upload: "Error",
      };
    }

    const warehouse = await db.warehouse.create({
      data: {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        contactPerson: data?.contactPerson,
        country: data?.country,
        city: data?.city,
        zipCode: data?.zipCode,
        slug: slug,
        imageUrl: data?.imageUrl,
        status: "ACTIVE",
      },
    });

    return warehouse;
  } catch (error: any) {
    return null;
  }
};

const deleteWarehouseByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Warehouse Id not found");
    }

    const warehouse = await db.warehouse.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!warehouse) {
      return sendResponse(res, 400, "Warehouse not found");
    }

    const deleteWarehouse = await db.warehouse.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(
      res,
      200,
      "Delete warehouse successfully",
      deleteWarehouse
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_WAREHOUSE]: Internal Error",
      error?.message
    );
  }
};

const getWarehouseByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Warehouse Id not found");
    }

    const warehouse = await db.warehouse.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!warehouse) {
      return sendResponse(res, 400, "Warehouse not found");
    }

    return sendResponse(
      res,
      200,
      "Get warehouse by id successfully",
      warehouse
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_WAREHOUSE_BY_ID]: Internal Error",
      error?.message
    );
  }
};

const updateWarehouseByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Warehouse Id not found");
    }

    const warehouse = await db.warehouse.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!warehouse) {
      return sendResponse(res, 400, "Warehouse not found");
    }

    const slug = generateSlug(body?.name);
    const checkSlug = await db.warehouse.findFirst({
      where: {
        slug: slug,
        NOT: {
          id: params.id, // Exclude the current warehouse from the check
        },
      },
    });

    if (checkSlug) {
      return sendResponse(res, 400, "Slug is already exist");
    }

    const warehouseUpdate = await db.warehouse.update({
      where: {
        id: params.id,
      },
      data: {
        name: body?.name,
        email: body?.email,
        phone: body?.phone,
        contactPerson: body?.contactPerson,
        country: body?.country,
        city: body?.city,
        zipCode: body?.zipCode,
        slug: slug,
        imageUrl: body?.imageUrl,
        status: body?.status,
      },
    });

    return sendResponse(
      res,
      200,
      "Update warehouse by id successfully",
      warehouseUpdate
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[UPDATE_WAREHOUSE_BY_ID]: Internal Error",
      error?.message
    );
  }
};

export {
  addWarehouseController,
  getAllWarehouseController,
  createBulkWarehousesController,
  deleteWarehouseByIdController,
  getWarehouseByIdController,
  updateWarehouseByIdController,
};
