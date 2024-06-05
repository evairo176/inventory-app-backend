import express from "express";
import {
  createCategory,
  getAllCategory,
} from "../controller/category-controller";

export const categoriesRoute = express.Router();

// fetch category by slug
categoriesRoute.post("/", createCategory);
categoriesRoute.get("/", getAllCategory);
