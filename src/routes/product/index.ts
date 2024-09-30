import express from "express";
import {
  addProductController,
  createBulkProductsController,
  deleteProductByIdController,
  getAllProductController,
  getProductByIdController,
  updateProductByIdController,
} from "../../controller";
import { validate } from "../../middleware";
import { addProductSchema, updateProductSchema } from "../../form-schema";

export const productRoutes = express.Router();

// create product
productRoutes.post("/", validate(addProductSchema), addProductController);

// create bulk product
productRoutes.post("/bulk", createBulkProductsController);

// get all product
productRoutes.get("/", getAllProductController);

// delete product
productRoutes.delete("/:id", deleteProductByIdController);

// get product by id
productRoutes.get("/:id", getProductByIdController);

// update product by id
productRoutes.put(
  "/:id",
  validate(updateProductSchema),
  updateProductByIdController
);
