import express from "express";

import { validate } from "../../middleware";
import { addRoleSchema, updateRoleSchema } from "../../form-schema";
import {
  addRoleController,
  deleteRoleByIdController,
  getAllRoleController,
  getRoleByIdController,
  updateRoleByIdController,
} from "../../controller";

export const rolesRoutes = express.Router();

// create role
rolesRoutes.post("/", validate(addRoleSchema), addRoleController);

// create bulk role
// rolesRoutes.post("/bulk", createBulkRolesController);

// get all role
rolesRoutes.get("/", getAllRoleController);

// delete role
rolesRoutes.delete("/:id", deleteRoleByIdController);

// get role by id
rolesRoutes.get("/:id", getRoleByIdController);

// update role by id
rolesRoutes.put("/:id", validate(updateRoleSchema), updateRoleByIdController);
