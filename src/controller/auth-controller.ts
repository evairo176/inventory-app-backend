import { compare } from "bcrypt";
import { db } from "../lib/db";
import { generateToken } from "../lib/generate-token";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/send-response";

//----------------------------------------------
// login
//----------------------------------------------
export const loginController = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const checkUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!checkUser) {
      return sendResponse(res, 404, "User not exist");
    }
    const hashPassword = checkUser.hashPassword as string;

    const isPasswordMatched = await compare(password, hashPassword);

    if (!isPasswordMatched) {
      return sendResponse(res, 400, "Password not matched");
    }

    const token = generateToken(checkUser?.id);

    const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);

    return sendResponse(res, 200, "Login Successfully", {
      user: checkUser,
      token: token,
      expired_token: decoded?.exp,
    });
  } catch (error: any) {
    // await sequelize.close(); // Ensure the connection is closed

    return res.status(401).json({
      message: "Invalid login credentials",
      error: error?.message,
    });
  }
};
