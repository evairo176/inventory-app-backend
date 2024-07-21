import express from "express";

import { validate } from "../middleware";
import {
  addUserSchema,
  updateUserSchema,
} from "../lib/validation-request-schema";
import {
  addUserController,
  createBulkUsersController,
  deleteUserByIdController,
  getAllUserController,
  getUserByIdController,
  updateUserByIdController,
} from "../controller/user-controller";

export const usersRoutes = express.Router();

// create category
usersRoutes.post("/", validate(addUserSchema), addUserController);

// create bulk category
usersRoutes.post("/bulk", createBulkUsersController);

// get all category
usersRoutes.get("/", getAllUserController);

// delete category
usersRoutes.delete("/:id", deleteUserByIdController);

// get category by id
usersRoutes.get("/:id", getUserByIdController);

// update category by id
usersRoutes.put("/:id", validate(updateUserSchema), updateUserByIdController);
