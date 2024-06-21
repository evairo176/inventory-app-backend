import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";
import { generateSlug } from "../utils/generate-slug";
import { ExcelUnitProps } from "../types";

const addUnitController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const checkAbbreviation = await db.unit.findFirst({
      where: {
        abbreviation: body?.abbreviation,
      },
    });

    if (checkAbbreviation) {
      return sendResponse(res, 400, "Abbreviation is already exist");
    }

    const unit = await db.unit.create({
      data: {
        title: body?.title,
        abbreviation: body?.abbreviation,
      },
    });

    return sendResponse(res, 200, "Create unit successfully", unit);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_UNIT]: Internal Error",
      error?.message
    );
  }
};

const getAllUnitController = async (req: Request, res: Response) => {
  try {
    const unit = await db.unit.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!unit) {
      return sendResponse(res, 400, "Unit not found!");
    }

    return sendResponse(res, 200, "Get all unit successfully", unit);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ALL_UNIT]: Internal Error",
      error?.message
    );
  }
};

const createBulkUnitsController = async (req: Request, res: Response) => {
  try {
    const body = req?.body;

    let units = [];

    for (const unit of body?.units) {
      const newUnit = await addUnit(unit);
      units.push(newUnit);
    }

    return sendResponse(res, 200, "Create Bulk unit successfully", units);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_BULK_UNIT]: Internal Error",
      error?.message
    );
  }
};

const addUnit = async (data: ExcelUnitProps) => {
  try {
    const checkAbbreviation = await db.unit.findFirst({
      where: {
        abbreviation: data?.abbreviation,
      },
    });

    if (checkAbbreviation) {
      return {
        title: data.title,
        status_upload: "Error",
      };
    }

    const unit = await db.unit.create({
      data: {
        title: data?.title,
        abbreviation: data?.abbreviation,
      },
    });

    return {
      title: unit.title,
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

const deleteUnitByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Unit Id not found");
    }

    const unit = await db.unit.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!unit) {
      return sendResponse(res, 400, "Unit not found");
    }

    const deleteUnit = await db.unit.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(res, 200, "Delete unit successfully", deleteUnit);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_UNIT]: Internal Error",
      error?.message
    );
  }
};

const getUnitByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Unit Id not found");
    }

    const unit = await db.unit.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!unit) {
      return sendResponse(res, 400, "Unit not found");
    }

    return sendResponse(res, 200, "Get unit by id successfully", unit);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_UNIT_BY_ID]: Internal Error",
      error?.message
    );
  }
};

const updateUnitByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Unit Id not found");
    }

    const unit = await db.unit.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!unit) {
      return sendResponse(res, 400, "Unit not found");
    }

    const checkAbbreviation = await db.unit.findFirst({
      where: {
        abbreviation: body?.abbreviation,
      },
    });

    if (checkAbbreviation) {
      return sendResponse(res, 400, "Abbreviation is already exist");
    }

    const unitUpdate = await db.unit.update({
      where: {
        id: params.id,
      },
      data: {
        title: body?.title,
        abbreviation: body?.abbreviation,
      },
    });

    return sendResponse(res, 200, "Update unit by id successfully", unitUpdate);
  } catch (error: any) {
    return sendResponse(res, 500, "[UPDATE_UNIT_BY_ID]: Internal Error", error);
  }
};

export {
  addUnitController,
  getAllUnitController,
  createBulkUnitsController,
  deleteUnitByIdController,
  getUnitByIdController,
  updateUnitByIdController,
};
