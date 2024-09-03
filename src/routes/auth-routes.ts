import express from "express";
import { loginController } from "../controller/auth-controller";

export const authRoutes = express.Router();

// login auth
authRoutes.post("/login", loginController);
