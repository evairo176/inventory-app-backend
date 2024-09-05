import expressAsyncHandler from "express-async-handler";
import { db } from "../../lib";
const jwt = require("jsonwebtoken");
let tokenBlacklist: string[] = []; // Example in-memory storage for blacklisted tokens
export const authMiddleware = expressAsyncHandler(
  async (req: any, res: any, next: any) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      try {
        if (token) {
          // Check if the token is blacklisted
          if (tokenBlacklist.includes(token)) {
            return res.status(401).send({
              message: "Token is blacklisted. Please login again.",
            });
          }

          const decoded = jwt.verify(token, process.env.JWT_KEY);

          const { id, iat, exp } = decoded;

          const user = await db.user.findUnique({
            where: {
              id,
            },
          });

          // attach the user to the request object
          // console.log(user);
          req.user = user;
          req.token_detail = { iat, exp };
          next();
        }
      } catch (error) {
        return res.status(401).send({
          message: "Authorization error",
        });
      }
    } else {
      throw new Error("There is no token attached to the header");
    }
  }
);

// Logout function (blacklist the token)
export const logout = (req: any, res: any) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (token) {
    // Add token to blacklist
    tokenBlacklist.push(token);

    return res.status(200).send({
      message: "Successfully logged out",
    });
  } else {
    return res.status(400).send({
      message: "No token provided",
    });
  }
};
