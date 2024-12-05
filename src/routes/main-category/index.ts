import express from "express";
import {
  addMainCategoryController,
  createBulkMainCategoryController,
  deleteMainCategoryByIdController,
  getAllMainCategoryController,
  getMainCategoryByIdController,
  updateMainCategoryByIdController,
} from "../../controller";
import { authMiddleware, validate } from "../../middleware";
import {
  addMainCategorySchema,
  updateMainCategorySchema,
} from "../../form-schema";

export const mainCategoriesRoutes = express.Router();

// create category
mainCategoriesRoutes.post(
  "/",
  validate(addMainCategorySchema),
  addMainCategoryController
);

// create bulk category
mainCategoriesRoutes.post("/bulk", createBulkMainCategoryController);

// get all category
mainCategoriesRoutes.get("/", getAllMainCategoryController);

// delete category
mainCategoriesRoutes.delete("/:id", deleteMainCategoryByIdController);

// get category by id
mainCategoriesRoutes.get("/:id", getMainCategoryByIdController);

// update category by id
mainCategoriesRoutes.put(
  "/:id",
  validate(updateMainCategorySchema),
  updateMainCategoryByIdController
);
