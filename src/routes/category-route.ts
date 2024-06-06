import express from "express";
import {
  addCategoryController,
  createBulkCategories,
  getAllCategoryController,
} from "../controller/category-controller";
import { validate } from "../middleware";
import { addCategorySchema } from "../lib/validation-request-schema";

export const categoriesRoute = express.Router();

// fetch category by slug

categoriesRoute.post("/", validate(addCategorySchema), addCategoryController);
categoriesRoute.post("/bulk", createBulkCategories);
categoriesRoute.get("/", getAllCategoryController);
