import { generateSlug, sendResponse } from "../../utils";
import { db } from "../../lib";
import { ExcelAdvertProps, ExcelCategoryProps } from "../../types";
import expressAsyncHandler from "express-async-handler";
import { AdvertSize, AdvertType } from "@prisma/client";

//----------------------------------------------
// get all banner
//----------------------------------------------
const getAllHomeBannerController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const banner = await db.advert.findMany({
        where: {
          type: "BANNER",
          status: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 6,
      });

      if (!banner) {
        return sendResponse(res, 400, "Banner not found!");
      }

      return sendResponse(res, 200, "Get all banner successfully", banner);
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_ALL_HOME_BANNER: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// get all advert
//----------------------------------------------
const getAllHomeAdvertController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const advert = await db.advert.findMany({
        where: {
          type: "ADVERT",
          status: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 4,
      });

      if (!advert) {
        return sendResponse(res, 400, "Advert not found!");
      }

      return sendResponse(res, 200, "Get all advert successfully", advert);
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_ALL_HOME_ADVERT: Internal Error",
        error?.message
      );
    }
  }
);

export { getAllHomeBannerController, getAllHomeAdvertController };
