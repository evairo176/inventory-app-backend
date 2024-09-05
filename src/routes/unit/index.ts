import express from "express";

import { validate } from "../../middleware";
import { addUnitSchema, updateUnitSchema } from "../../form-schema";
import {
  addUnitController,
  createBulkUnitsController,
  deleteUnitByIdController,
  getAllUnitController,
  getUnitByIdController,
  updateUnitByIdController,
} from "../../controller";

export const unitsRoutes = express.Router();

// create category
unitsRoutes.post("/", validate(addUnitSchema), addUnitController);

// create bulk category
unitsRoutes.post("/bulk", createBulkUnitsController);

// get all category
unitsRoutes.get("/", getAllUnitController);

// delete category
unitsRoutes.delete("/:id", deleteUnitByIdController);

// get category by id
unitsRoutes.get("/:id", getUnitByIdController);

// update category by id
unitsRoutes.put("/:id", validate(updateUnitSchema), updateUnitByIdController);
