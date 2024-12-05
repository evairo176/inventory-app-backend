import express from "express";
import {
  addSubCategoryController,
  createBulkSubCategoryController,
  deleteSubCategoryByIdController,
  getAllSubCategoryController,
  getSubCategoryByIdController,
  updateSubCategoryByIdController,
} from "../../controller";
import { authMiddleware, validate } from "../../middleware";
import {
  addSubCategorySchema,
  updateSubCategorySchema,
} from "../../form-schema";

export const subCategoriesRoutes = express.Router();

// create category
subCategoriesRoutes.post(
  "/",
  validate(addSubCategorySchema),
  addSubCategoryController
);

// create bulk category
subCategoriesRoutes.post("/bulk", createBulkSubCategoryController);

// get all category
subCategoriesRoutes.get("/", getAllSubCategoryController);

// delete category
subCategoriesRoutes.delete("/:id", deleteSubCategoryByIdController);

// get category by id
subCategoriesRoutes.get("/:id", getSubCategoryByIdController);

// update category by id
subCategoriesRoutes.put(
  "/:id",
  validate(updateSubCategorySchema),
  updateSubCategoryByIdController
);
