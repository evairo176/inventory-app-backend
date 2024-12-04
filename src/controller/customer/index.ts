import expressAsyncHandler from "express-async-handler";
import { db } from "../../lib";
import { sendResponse } from "../../utils";
import bcrypt from "bcrypt";

//----------------------------------------------
// get all customer controller
//----------------------------------------------
export const getAllCustomerController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const customer = await db.customer.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          additionalInfo: true,
          billingAddress: true,
          shippingAddress: true,
          user: {
            select: {
              id: true,
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
              role: true,
            },
          },
        },
        where: {
          user: {
            role: {
              roleName: "customer",
            },
          },
        },
      });

      if (!customer) {
        return sendResponse(res, 400, "customer not found!");
      }

      return sendResponse(res, 200, "Get all user successfully", customer);
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_ALL_USER]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// get customer BY ID controller
//----------------------------------------------
export const getCustomerByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "User Id not found");
      }

      const user = await db.customer.findFirst({
        where: {
          id: params.id,
        },
        select: {
          id: true,
          additionalInfo: true,
          billingAddress: true,
          shippingAddress: true,
          user: {
            select: {
              id: true,
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
              role: true,
            },
          },
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
  }
);

//----------------------------------------------
// create customer controller
//----------------------------------------------
export const createCustomerController = expressAsyncHandler(
  async (req: any, res: any) => {
    const {
      firstName,
      lastName,
      email,
      password,
      billingAddress,
      shippingAddress,
      additionalInfo,
      roleId, // Include roleId in the input
      phone,
      imageUrl,
      status,
    } = req?.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      const customerExisting = await db.customer.findFirst({
        where: {
          user: {
            email: email,
          },
        },
        select: {
          id: true,
          user: true,
        },
      });

      if (!customerExisting) {
        return sendResponse(res, 400, "Email already exist");
      }

      // Start a transaction to create both User and Customer
      const newUser = await db.user.create({
        data: {
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          email,
          password: password,
          roleId, // Assign the role if provided
          phone,
          imageUrl: imageUrl,
          hashPassword: hashedPassword, // Save hashed password
          status,
          customer: {
            create: {
              billingAddress,
              shippingAddress,
              additionalInfo,
            },
          },
        },
        include: {
          customer: true, // Include customers in the response
        },
      });

      return sendResponse(res, 200, "Create user customer Successfully", {
        newUser,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error?.message,
      });
    }
  }
);

//----------------------------------------------
// update customer controller
//----------------------------------------------
export const updateCustomerController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    const {
      firstName,
      lastName,
      email,
      billingAddress,
      shippingAddress,
      additionalInfo,

      phone,
      imageUrl,
      status,
    } = req?.body;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "User Id not found");
      }

      const customerExisting = await db.customer.findFirst({
        where: {
          id: params.id,
        },
        select: {
          id: true,
          user: true,
        },
      });

      if (!customerExisting) {
        return sendResponse(res, 400, "User not found");
      }

      if (customerExisting.user.email !== email) {
        const checkEmail = await db.user.findFirst({
          where: {
            email: email,
          },
        });

        if (checkEmail) {
          return sendResponse(res, 400, "Email is already exist");
        }
      }

      // Start a transaction to update both User and Customer atomically
      const updatedUser = await db.$transaction(async (prisma) => {
        // Update the User
        const userUpdate = await prisma.user.update({
          where: {
            id: customerExisting.user.id,
          },
          data: {
            firstName,
            lastName,
            name: `${firstName} ${lastName}`, // Update the full name
            email,
            phone,
            imageUrl,
            status,
          },
        });

        // Update the associated Customer
        const customerUpdate = await prisma.customer.update({
          where: {
            id: customerExisting.id, // Assuming each user has one associated customer
          },
          data: {
            billingAddress,
            shippingAddress,
            additionalInfo,
          },
        });

        return {
          user: userUpdate,
          customer: customerUpdate,
        };
      });

      const customer = await db.customer.findFirst({
        where: {
          id: updatedUser.customer.id,
        },
      });

      return sendResponse(res, 200, "Update user customer Successfully", {
        customer,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error?.message,
      });
    }
  }
);

//----------------------------------------------
// delete customer BY ID controller
//----------------------------------------------
export const deleteCustomerByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "User Id not found");
      }

      const customerExisting = await db.customer.findFirst({
        where: {
          id: params.id,
        },
        select: {
          id: true,
          additionalInfo: true,
          billingAddress: true,
          shippingAddress: true,
          user: {
            select: {
              id: true,
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
              role: true,
            },
          },
        },
      });

      if (!customerExisting) {
        return sendResponse(res, 400, "User not found");
      }

      await db.$transaction(async (prisma) => {
        // First, delete the customer by id
        await prisma.customer.delete({
          where: {
            id: customerExisting.id,
          },
        });

        // Then, delete the associated user, assuming userId is stored in the customer model
        await prisma.user.delete({
          where: {
            id: customerExisting.user.id, // Replace `params.userId` with the correct field
          },
        });
      });

      return sendResponse(
        res,
        200,
        "Delete User by id successfully",
        customerExisting
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[DELETE_CUSTOMER_BY_ID]: Internal Error",
        error?.message
      );
    }
  }
);
