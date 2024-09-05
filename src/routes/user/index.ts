import express from "express";

import { validate } from "../../middleware";
import {
  addUserSchema,
  updateInviteSentSchema,
  updateUserSchema,
} from "../../form-schema";
import {
  addUserController,
  createBulkUsersController,
  deleteUserByIdController,
  getAllUserController,
  getUserByIdController,
  updateInviteSentUserController,
  updateUserByIdController,
} from "../../controller";

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

// update invite sent
usersRoutes.put(
  "/invite/email-sent",
  validate(updateInviteSentSchema),
  updateInviteSentUserController
);
