import express from "express";

import {
  getAllHomeAdvertController,
  getAllHomeBannerController,
  getPopulateMainCategoryController,
} from "../../controller";

export const homeRoutes = express.Router();

// get all home banner
homeRoutes.get("/banner", getAllHomeBannerController);

// get all home advert
homeRoutes.get("/advert", getAllHomeAdvertController);

// get populate main category
homeRoutes.get("/populate-main-category", getPopulateMainCategoryController);
