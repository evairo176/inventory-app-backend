import { generateSlug, sendResponse } from "../../utils";
import { db } from "../../lib";
import { ExcelAdvertProps, ExcelCategoryProps } from "../../types";
import expressAsyncHandler from "express-async-handler";

//----------------------------------------------
// add advert
//----------------------------------------------
const addAdvertController = expressAsyncHandler(async (req: any, res: any) => {
  const body = req?.body;

  try {
    const advert = await db.advert.create({
      data: {
        ...body,
        status: body?.status === "ACTIVE" ? true : false,
      },
    });

    return sendResponse(res, 200, "Create advert successfully", advert);
  } catch (error: any) {
    return sendResponse(
      res,
      500,
      "[CREATE_ADVERT]: Internal Error",
      error?.message
    );
  }
});

//----------------------------------------------
// get all advert by id
//----------------------------------------------
const getAllAdvertController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const advert = await db.advert.findMany({
        orderBy: {
          updatedAt: "desc",
        },
      });

      if (!advert) {
        return sendResponse(res, 400, "Advert not found!");
      }

      return sendResponse(res, 200, "Get all advert successfully", advert);
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_ALL_ADVERT: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// add bulk advert
//----------------------------------------------
const createBulkAdvertController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const body = req?.body;

      let adverts = [];

      for (const advert of body?.adverts) {
        const newAdvert = await addAdvert(advert);
        adverts.push(newAdvert);
      }

      return sendResponse(res, 200, "Create Bulk advert successfully", adverts);
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[CREATE_BULK_ADVERT]: Internal Error",
        error?.message
      );
    }
  }
);

const addAdvert = async (data: ExcelAdvertProps) => {
  try {
    const status = data?.status;
    const advert = await db.advert.create({
      data: {
        ...data,
        status: status === "ACTIVE" ? true : false,
      },
    });

    return {
      title: advert.title,
      status_upload: "",
    };
  } catch (error: any) {
    return {
      title: "",
      status_upload: "",
      error: error?.message,
      data: data,
    };
  }
};

//----------------------------------------------
// delete advert by id
//----------------------------------------------
const deleteAdvertByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Advert Id not found");
      }

      const advert = await db.advert.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!advert) {
        return sendResponse(res, 400, "Advert not found");
      }

      const deleteAdvert = await db.advert.delete({
        where: {
          id: params.id,
        },
      });

      return sendResponse(res, 200, "Delete advert successfully", deleteAdvert);
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[DELETE_ADVERT]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// get advert by id
//----------------------------------------------
const getAdvertByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Advert Id not found");
      }

      const advert = await db.advert.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!advert) {
        return sendResponse(res, 400, "Advert not found");
      }

      return sendResponse(res, 200, "Get advert by id successfully", advert);
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[GET_ADVERT_BY_ID]: Internal Error",
        error?.message
      );
    }
  }
);

//----------------------------------------------
// update advert by id
//----------------------------------------------
const updateAdvertByIdController = expressAsyncHandler(
  async (req: any, res: any) => {
    const params = req?.params;
    const body = req?.body;
    try {
      if (!params.id) {
        return sendResponse(res, 400, "Advert Id not found");
      }

      const advert = await db.advert.findFirst({
        where: {
          id: params.id,
        },
      });

      if (!advert) {
        return sendResponse(res, 400, "Advert not found");
      }

      const advertUpdate = await db.advert.update({
        where: {
          id: params.id,
        },
        data: {
          ...body,
          status: body?.status === "ACTIVE" ? true : false,
        },
      });

      return sendResponse(
        res,
        200,
        "Update advert by id successfully",
        advertUpdate
      );
    } catch (error: any) {
      return sendResponse(
        res,
        500,
        "[UPDATE_ADVERT_BY_ID]: Internal Error",
        error?.message
      );
    }
  }
);

export {
  addAdvertController,
  getAllAdvertController,
  createBulkAdvertController,
  deleteAdvertByIdController,
  getAdvertByIdController,
  updateAdvertByIdController,
};
