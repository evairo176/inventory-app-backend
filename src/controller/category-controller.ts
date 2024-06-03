import { Request, Response } from "express";
import { sendResponse } from "../utils/send-response";
import { db } from "../lib/db";

const createCategory = async (req: Request, res: Response) => {
  const body = req?.body;
  console.log(body);
  try {
    const checkSlug = await db.category.findFirst({
      where: {
        slug: body?.slug,
      },
    });

    if (checkSlug) {
      return sendResponse(res, 400, "Slug is already exist");
    }

    const category = await db.category.create({
      data: {
        title: body?.title,
        description: body?.description,
        status: body?.status,
        slug: body?.slug,
        imageUrl: body?.imageUrl,
      },
    });

    return sendResponse(res, 200, "Create category successfully", {
      data: category,
    });
  } catch (error) {
    return sendResponse(res, 500, "INTERNAL ERROR", error);
  }
};

export { createCategory };
