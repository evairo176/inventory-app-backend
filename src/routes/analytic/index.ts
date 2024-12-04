import express from "express";
import { getAnalyticController } from "../../controller";

export const analyticRoutes = express.Router();

// get analytic
analyticRoutes.get("/sales", getAnalyticController);
