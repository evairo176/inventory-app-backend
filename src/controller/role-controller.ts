import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";
import { generateSlug } from "../utils/generate-slug";
import { Role } from "../types";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const addRoleController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const checkAbbreviation = await db.role.findFirst({
      where: {
        roleName: body?.roleName,
      },
    });

    if (checkAbbreviation) {
      return sendResponse(res, 400, "Role Name is already exist");
    }

    const role = await db.role.create({
      data: {
        displayName: body?.displayName,
        roleName: body?.roleName,
        description: body?.description,
        status: body?.status,
        permissions: {
          create: body?.permissionIds.map((permissionId: string) => ({
            permission: { connect: { id: permissionId } },
          })),
        },
      },
    });

    return sendResponse(res, 200, "Create role successfully", role);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_ROLE]: Internal Error",
      error?.message
    );
  }
};

const getAllRoleController = async (req: Request, res: Response) => {
  try {
    const role = await db.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        users: true,
        roleMenus: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return sendResponse(res, 200, "Get all role successfully", role);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ALL_ROLE]: Internal Error",
      error?.message
    );
  }
};

// const createBulkRolesController = async (req: Request, res: Response) => {
//   try {
//     const body = req?.body;

//     let roles = [];

//     for (const role of body?.roles) {
//       const newRole = await addRole(role);
//       roles.push(newRole);
//     }

//     return sendResponse(res, 200, "Create Bulk role successfully", roles);
//   } catch (error: any) {
//     return sendResponse(
//       res,
//       500,
//       "[CREATE_BULK_ROLE]: Internal Error",
//       error?.message
//     );
//   }
// };

// const addRole = async (data: ExcelRoleProps) => {
//   try {
//     const checkAbbreviation = await db.role.findFirst({
//       where: {
//         abbreviation: data?.abbreviation,
//       },
//     });

//     if (checkAbbreviation) {
//       return {
//         title: data.title,
//         status_upload: "Error",
//       };
//     }

//     const role = await db.role.create({
//       data: {
//         title: data?.title,
//         abbreviation: data?.abbreviation,
//       },
//     });

//     return {
//       title: role.title,
//       status_upload: "",
//     };
//   } catch (error: any) {
//     return {
//       title: "",
//       status_upload: "",
//       error: error?.message,
//       data: data,
//     };
//   }
// };

const deleteRoleByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Role Id not found");
    }

    const role = await db.role.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!role) {
      return sendResponse(res, 400, "Role not found");
    }

    const deleteRole = await db.role.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(res, 200, "Delete role successfully", deleteRole);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_ROLE]: Internal Error",
      error?.message
    );
  }
};

const getRoleByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Role Id not found");
    }

    const role = await db.role.findFirst({
      where: {
        id: params.id,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        users: true,
        roleMenus: true,
      },
    });

    if (!role) {
      return sendResponse(res, 400, "Role not found");
    }

    return sendResponse(res, 200, "Get role by id successfully", role);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ROLE_BY_ID]: Internal Error",
      error?.message
    );
  }
};

const updateRoleByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Role Id not found");
    }

    const existingRole = await db.role.findFirst({
      where: {
        id: params.id,
      },
      include: { permissions: true },
    });

    if (!existingRole) {
      return sendResponse(res, 400, "Role not found");
    }

    if (existingRole.roleName !== body?.roleName) {
      const checkRoleName = await db.role.findFirst({
        where: {
          roleName: body?.roleName,
        },
      });

      if (checkRoleName) {
        return sendResponse(res, 400, "Role Name is already exist");
      }
    }

    // Remove existing RolePermission records
    const removeRole = await db.rolePermission.deleteMany({
      where: {
        roleId: params?.id,
      },
    });

    // Create new RolePermission records

    await Promise.all(
      body?.permissionIds.map((permissionId: string) =>
        db.rolePermission.create({
          data: {
            roleId: params?.id,
            permissionId,
          },
        })
      )
    );

    // Update the role without changing permissions directly
    const updatedRole = await db.role.update({
      where: { id: params?.id },
      data: {
        displayName: body?.displayName,
        roleName: body?.roleName,
        description: body?.description,
        status: body?.status,
      },
    });

    return sendResponse(res, 200, "Update role by id successfully", removeRole);
  } catch (error: any) {
    if (error instanceof PrismaClientValidationError) {
      console.error("Prisma Client Validation Error:", error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    return sendResponse(
      res,
      500,
      "[UPDATE_ROLE_BY_ID]: Internal Error",
      error.message
    );
  }
};

export {
  addRoleController,
  getAllRoleController,
  // createBulkRolesController,
  deleteRoleByIdController,
  getRoleByIdController,
  updateRoleByIdController,
};
