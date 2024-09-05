import { Response } from "express";

const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: data,
  });
};
export { sendResponse };
