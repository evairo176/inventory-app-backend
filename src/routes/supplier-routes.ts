import express from "express";
import {
  addSupplierController,
  createBulkSuppliersController,
  deleteSupplierByIdController,
  getAllSupplierController,
  getSupplierByIdController,
  updateSupplierByIdController,
} from "../controller/supplier-controller";
import { validate } from "../middleware";
import {
  addSupplierSchema,
  updateSupplierSchema,
} from "../lib/validation-request-schema";

export const suppliersRoutes = express.Router();

// create supplier
suppliersRoutes.post("/", validate(addSupplierSchema), addSupplierController);

// create bulk supplier
suppliersRoutes.post("/bulk", createBulkSuppliersController);

// get all supplier
suppliersRoutes.get("/", getAllSupplierController);

// delete supplier
suppliersRoutes.delete("/:id", deleteSupplierByIdController);

// get supplier by id
suppliersRoutes.get("/:id", getSupplierByIdController);

// update supplier by id
suppliersRoutes.put(
  "/:id",
  validate(updateSupplierSchema),
  updateSupplierByIdController
);
