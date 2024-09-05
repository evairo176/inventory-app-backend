import express from "express";
import { loginController } from "../../controller";
import { validate } from "../../middleware";
import { loginSchema } from "../../form-schema";

export const authRoutes = express.Router();

// login auth
authRoutes.post("/login", validate(loginSchema), loginController);
