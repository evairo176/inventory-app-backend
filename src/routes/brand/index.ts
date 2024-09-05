import express from "express";

import { validate } from "../../middleware";
import { addBrandSchema, updateBrandSchema } from "../../form-schema";
import {
  addBrandController,
  createBulkBrandsController,
  deleteBrandByIdController,
  getAllBrandController,
  getBrandByIdController,
  updateBrandByIdController,
} from "../../controller";

export const brandsRoutes = express.Router();

// create category
brandsRoutes.post("/", validate(addBrandSchema), addBrandController);

// create bulk category
brandsRoutes.post("/bulk", createBulkBrandsController);

// get all category
brandsRoutes.get("/", getAllBrandController);

// delete category
brandsRoutes.delete("/:id", deleteBrandByIdController);

// get category by id
brandsRoutes.get("/:id", getBrandByIdController);

// update category by id
brandsRoutes.put(
  "/:id",
  validate(updateBrandSchema),
  updateBrandByIdController
);
