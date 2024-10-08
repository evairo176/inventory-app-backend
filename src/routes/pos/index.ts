import express from "express";
import { createLineOrderController, loginController } from "../../controller";
import { validate } from "../../middleware";
import { createLineOrderSchema } from "../../form-schema";

export const posRoutes = express.Router();

// pos create line order
posRoutes.post(
  "/create-line-order",
  validate(createLineOrderSchema),
  createLineOrderController
);
