import express from "express";
import {
  addWarehouseController,
  createBulkWarehousesController,
  deleteWarehouseByIdController,
  getAllWarehouseController,
  getWarehouseByIdController,
  updateWarehouseByIdController,
} from "../../controller";
import { validate } from "../../middleware";
import { addWarehouseSchema, updateWarehouseSchema } from "../../form-schema";

export const warehousesRoutes = express.Router();

// create warehouse
warehousesRoutes.post(
  "/",
  validate(addWarehouseSchema),
  addWarehouseController
);

// create bulk warehouse
warehousesRoutes.post("/bulk", createBulkWarehousesController);

// get all warehouse
warehousesRoutes.get("/", getAllWarehouseController);

// delete warehouse
warehousesRoutes.delete("/:id", deleteWarehouseByIdController);

// get warehouse by id
warehousesRoutes.get("/:id", getWarehouseByIdController);

// update warehouse by id
warehousesRoutes.put(
  "/:id",
  validate(updateWarehouseSchema),
  updateWarehouseByIdController
);
