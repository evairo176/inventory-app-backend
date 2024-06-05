import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/send-response";

// not found
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// error handling
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  sendResponse(res, statusCode, err?.message, {
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// validate request
export const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    return sendResponse(res, 400, "Invalid request", {
      error: err.errors,
    });
  }
};
