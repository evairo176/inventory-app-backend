import express from "express";
import {
  addCategoryController,
  createBulkCategoriesController,
  deleteCategoryByIdController,
  getAllCategoryController,
  getCategoryByIdController,
  updateCategoryByIdController,
} from "../controller/category-controller";
import { validate } from "../middleware";
import {
  addCategorySchema,
  updateCategorySchema,
} from "../lib/validation-request-schema";

export const categoriesRoute = express.Router();

// create category
categoriesRoute.post("/", validate(addCategorySchema), addCategoryController);

// create bulk category
categoriesRoute.post("/bulk", createBulkCategoriesController);

// get all category
categoriesRoute.get("/", getAllCategoryController);

// delete category
categoriesRoute.delete("/:id", deleteCategoryByIdController);

// get category by id
categoriesRoute.get("/:id", getCategoryByIdController);

// update category by id
categoriesRoute.put(
  "/:id",
  validate(updateCategorySchema),
  updateCategoryByIdController
);
