import express from "express";
import {
  addCategoryController,
  createBulkCategoriesController,
  deleteCategoryByIdController,
  getAllCategoryController,
  getCategoryByIdController,
  updateCategoryByIdController,
} from "../../controller";
import { authMiddleware, validate } from "../../middleware";
import { addCategorySchema, updateCategorySchema } from "../../form-schema";

export const categoriesRoutes = express.Router();

// create category
categoriesRoutes.post("/", validate(addCategorySchema), addCategoryController);

// create bulk category
categoriesRoutes.post("/bulk", createBulkCategoriesController);

// get all category
categoriesRoutes.get("/", getAllCategoryController);

// delete category
categoriesRoutes.delete("/:id", deleteCategoryByIdController);

// get category by id
categoriesRoutes.get("/:id", getCategoryByIdController);

// update category by id
categoriesRoutes.put(
  "/:id",
  validate(updateCategorySchema),
  updateCategoryByIdController
);
