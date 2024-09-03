import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_KEY as string, {
    expiresIn: "1h",
  });
};
export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_KEY as string, {
    expiresIn: "30d",
  });
};
