import express from "express";

import { validate } from "../../middleware";
import { createCustomersSchema, updateCustomerSchema } from "../../form-schema";
import {
  createCustomerController,
  getAllCustomerController,
} from "../../controller";
import {
  deleteCustomerByIdController,
  getCustomerByIdController,
  updateCustomerController,
} from "../../controller/customer";

export const customersRoutes = express.Router();

// get all customer
customersRoutes.get("/", getAllCustomerController);

// get customer by id
customersRoutes.get("/:id", getCustomerByIdController);

// create customer
customersRoutes.post(
  "/",
  validate(createCustomersSchema),
  createCustomerController
);

// update customer by id
customersRoutes.put(
  "/:id",
  validate(updateCustomerSchema),
  updateCustomerController
);

// delete customer by id
customersRoutes.delete("/:id", deleteCustomerByIdController);
