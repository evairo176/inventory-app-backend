import expressAsyncHandler from "express-async-handler";
import { db } from "../../lib";
import { sendResponse } from "../../utils";
import bcrypt from "bcrypt";

//----------------------------------------------
// create user and customer controller
//----------------------------------------------

export const createUserAndCustomerController = expressAsyncHandler(
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
      profileImage,
      status,
    } = req?.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

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
          imageUrl: profileImage,
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
