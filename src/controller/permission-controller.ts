import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";
import { generateSlug } from "../utils/generate-slug";
import { Permissions } from "../types";

const addPermissionController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const checkPermissionName = await db.permission.findFirst({
      where: {
        permissionName: body?.permissionName,
      },
    });

    if (checkPermissionName) {
      return sendResponse(res, 400, "Permission Name is already exist");
    }

    const permission = await db.permission.create({
      data: {
        displayName: body?.displayName,
        permissionName: body?.permissionName,
        description: body?.description,
        module: body?.module,
        status: body?.status,
      },
    });

    return sendResponse(res, 200, "Create permission successfully", permission);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_PERMISSION]: Internal Error",
      error?.message
    );
  }
};

const getAllPermissionController = async (req: Request, res: Response) => {
  const query = req?.query;
  try {
    let permission = await db.permission.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    console.log({ query });
    if (query?.role) {
      permission = await db.permission.findMany({
        orderBy: {
          displayName: "asc",
        },
      });
    }

    return sendResponse(
      res,
      200,
      "Get all permission successfully",
      permission
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ALL_PERMISSION]: Internal Error",
      error?.message
    );
  }
};

// const createBulkPermissionsController = async (req: Request, res: Response) => {
//   try {
//     const body = req?.body;

//     let permissions = [];

//     for (const permission of body?.permissions) {
//       const newPermission = await addPermission(permission);
//       permissions.push(newPermission);
//     }

//     return sendResponse(res, 200, "Create Bulk permission successfully", permissions);
//   } catch (error: any) {
//     return sendResponse(
//       res,
//       500,
//       "[CREATE_BULK_PERMISSION]: Internal Error",
//       error?.message
//     );
//   }
// };

// const addPermission = async (data: ExcelPermissionProps) => {
//   try {
//     const checkPermissionName = await db.permission.findFirst({
//       where: {
//         permissionname: data?.permissionname,
//       },
//     });

//     if (checkPermissionName) {
//       return {
//         title: data.title,
//         status_upload: "Error",
//       };
//     }

//     const permission = await db.permission.create({
//       data: {
//         title: data?.title,
//         permissionname: data?.permissionname,
//       },
//     });

//     return {
//       title: permission.title,
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

const deletePermissionByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Permission Id not found");
    }

    const permission = await db.permission.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!permission) {
      return sendResponse(res, 400, "Permission not found");
    }

    const deletePermission = await db.permission.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(
      res,
      200,
      "Delete permission successfully",
      deletePermission
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_PERMISSION]: Internal Error",
      error?.message
    );
  }
};

const getPermissionByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Permission Id not found");
    }

    const permission = await db.permission.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!permission) {
      return sendResponse(res, 400, "Permission not found");
    }

    return sendResponse(
      res,
      200,
      "Get permission by id successfully",
      permission
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_PERMISSION_BY_ID]: Internal Error",
      error?.message
    );
  }
};

const updatePermissionByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "Permission Id not found");
    }

    const permission = await db.permission.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!permission) {
      return sendResponse(res, 400, "Permission not found");
    }

    if (permission.permissionName !== body?.permissionName) {
      const checkPermissionName = await db.permission.findFirst({
        where: {
          permissionName: body?.permissionName,
        },
      });

      if (checkPermissionName) {
        return sendResponse(res, 400, "Permission Name is already exist");
      }
    }

    const permissionUpdate = await db.permission.update({
      where: {
        id: params.id,
      },
      data: {
        displayName: body?.displayName,
        permissionName: body?.permissionName,
        description: body?.description,
        module: body?.module,
        status: body?.status,
      },
    });

    return sendResponse(
      res,
      200,
      "Update permission by id successfully",
      permissionUpdate
    );
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[UPDATE_PERMISSION_BY_ID]: Internal Error",
      error
    );
  }
};

export {
  addPermissionController,
  getAllPermissionController,
  // createBulkPermissionsController,
  deletePermissionByIdController,
  getPermissionByIdController,
  updatePermissionByIdController,
};
