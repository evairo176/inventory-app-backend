import express from "express";
import { createCategory } from "../controller/category-controller";

export const categoriesRoute = express.Router();

// fetch category by slug
categoriesRoute.post("/", createCategory);
