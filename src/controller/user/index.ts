import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../lib";
import { sendResponse } from "../../utils";
import { User } from "../../types";

const addUserController = async (req: Request, res: Response) => {
  const body = req?.body;

  try {
    const checkEmail = await db.user.findFirst({
      where: {
        email: body?.email,
      },
    });

    if (checkEmail) {
      return sendResponse(res, 400, "Email is already exist");
    }
    const password = await bcrypt.hash(body?.password, 12);

    const user = await db.user.create({
      data: {
        firstName: body?.firstName,
        lastName: body?.lastName,
        name: `${body.firstName} ${body.lastName}`,
        email: body?.email,
        phone: body?.phone,
        password: body?.password,
        hashPassword: password,
        roleId: body?.roleId,
        status: body?.status,
        imageUrl: body?.imageUrl,
      },
    });

    return sendResponse(res, 200, "Create user successfully", user);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_USER]: Internal Error",
      error?.message
    );
  }
};

const getAllUserController = async (req: Request, res: Response) => {
  try {
    const user = await db.user.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        role: true,
        roleId: true,
        firstName: true,
        lastName: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        imageUrl: true,
        inviteSent: true,
        password: true,
        // Exclude the password field
      },
    });

    if (!user) {
      return sendResponse(res, 400, "User not found!");
    }

    return sendResponse(res, 200, "Get all user successfully", user);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_ALL_USER]: Internal Error",
      error?.message
    );
  }
};

const createBulkUsersController = async (req: Request, res: Response) => {
  try {
    const body = req?.body;

    let users = [];

    for (const user of body?.users) {
      const newUser = await addUser(user);
      users.push(newUser);
    }

    return sendResponse(res, 200, "Create Bulk user successfully", users);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_BULK_USER]: Internal Error",
      error?.message
    );
  }
};

const addUser = async (data: User) => {
  try {
    const checkEmail = await db.user.findFirst({
      where: {
        email: data?.email,
      },
    });

    if (checkEmail) {
      return {
        title: `${data.firstName} ${data.lastName}`,
        status_upload: "Error",
      };
    }
    const password = await bcrypt.hash(data?.password, 12);
    const user = await db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        password: data?.password,
        hashPassword: password,
        roleId: data?.roleId,
        imageUrl: data?.imageUrl,
      },
    });

    return {
      title: `${data.firstName} ${data.lastName}`,
      status_upload: "",
    };
  } catch (error: any) {
    return {
      title: "",
      status_upload: "",
      error: error?.message,
      data: data,
    };
  }
};

const deleteUserByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "User Id not found");
    }

    const user = await db.user.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return sendResponse(res, 400, "User not found");
    }

    const deleteUser = await db.user.delete({
      where: {
        id: params.id,
      },
    });

    return sendResponse(res, 200, "Delete user successfully", deleteUser);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[DELETE_USER]: Internal Error",
      error?.message
    );
  }
};

const getUserByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "User Id not found");
    }

    const user = await db.user.findFirst({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        role: true,
        roleId: true,
        firstName: true,
        lastName: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        imageUrl: true,
        inviteSent: true,
        password: true,
        // Exclude the password field
      },
    });

    if (!user) {
      return sendResponse(res, 400, "User not found");
    }

    return sendResponse(res, 200, "Get user by id successfully", user);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[GET_USER_BY_ID]: Internal Error",
      error?.message
    );
  }
};

const updateUserByIdController = async (req: Request, res: Response) => {
  const params = req?.params;
  const body = req?.body;
  try {
    if (!params.id) {
      return sendResponse(res, 400, "User Id not found");
    }

    const user = await db.user.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return sendResponse(res, 400, "User not found");
    }

    if (user.email !== body?.email) {
      const checkEmail = await db.user.findFirst({
        where: {
          email: body?.email,
        },
      });

      if (checkEmail) {
        return sendResponse(res, 400, "Email is already exist");
      }
    }

    const userUpdate = await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        firstName: body?.firstName,
        lastName: body?.lastName,
        name: `${body.firstName} ${body.lastName}`,
        email: body?.email,
        phone: body?.phone,
        roleId: body?.roleId,
        status: body?.status,
        imageUrl: body?.imageUrl,
      },
    });

    return sendResponse(res, 200, "Update user by id successfully", userUpdate);
  } catch (error: any) {
    return sendResponse(res, 500, "[UPDATE_USER_BY_ID]: Internal Error", error);
  }
};

const updateInviteSentUserController = async (req: Request, res: Response) => {
  const body = req?.body;
  try {
    const user = await db.user.findFirst({
      where: {
        email: body?.email,
      },
    });

    if (!user) {
      return sendResponse(res, 400, "User not found");
    }

    const userUpdate = await db.user.update({
      where: {
        email: body.email,
      },
      data: {
        inviteSent: true,
      },
    });

    return sendResponse(res, 200, "Invite successfully", userUpdate);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[UPDATE_SENT_EMAIL_USER]: Internal Error",
      error
    );
  }
};

export {
  addUserController,
  getAllUserController,
  createBulkUsersController,
  deleteUserByIdController,
  getUserByIdController,
  updateUserByIdController,
  updateInviteSentUserController,
};
