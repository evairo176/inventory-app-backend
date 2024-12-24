import express from "express";

import {
  getAllHomeAdvertController,
  getAllHomeBannerController,
} from "../../controller";

export const homeRoutes = express.Router();

// get all home banner
homeRoutes.get("/banner", getAllHomeBannerController);

// get all home advert
homeRoutes.get("/advert", getAllHomeAdvertController);
