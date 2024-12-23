import express from "express";
import { validate } from "../../middleware";
import { addAdvertSchema, updateAdvertSchema } from "../../form-schema";
import {
  addAdvertController,
  createBulkCategoriesController,
  deleteAdvertByIdController,
  getAllAdvertController,
  getAdvertByIdController,
  updateAdvertByIdController,
} from "../../controller";

export const advertRoutes = express.Router();

// create advert
advertRoutes.post("/", validate(addAdvertSchema), addAdvertController);

// create bulk advert
advertRoutes.post("/bulk", createBulkCategoriesController);

// get all advert
advertRoutes.get("/", getAllAdvertController);

// delete advert
advertRoutes.delete("/:id", deleteAdvertByIdController);

// get advert by id
advertRoutes.get("/:id", getAdvertByIdController);

// update advert by id
advertRoutes.put(
  "/:id",
  validate(updateAdvertSchema),
  updateAdvertByIdController
);
