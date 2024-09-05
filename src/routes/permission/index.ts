import express from "express";

import { validate } from "../../middleware";

import {
  addPermissionController,
  deletePermissionByIdController,
  getAllPermissionController,
  getPermissionByIdController,
  updatePermissionByIdController,
} from "../../controller";
import { addPermissionSchema, updatePermissionSchema } from "../../form-schema";

export const permissionsRoutes = express.Router();

// create permission
permissionsRoutes.post(
  "/",
  validate(addPermissionSchema),
  addPermissionController
);

// create bulk permission
// permissionsRoutes.post("/bulk", createBulkPermissionsController);

// get all permission
permissionsRoutes.get("/", getAllPermissionController);

// delete permission
permissionsRoutes.delete("/:id", deletePermissionByIdController);

// get permission by id
permissionsRoutes.get("/:id", getPermissionByIdController);

// update permission by id
permissionsRoutes.put(
  "/:id",
  validate(updatePermissionSchema),
  updatePermissionByIdController
);
