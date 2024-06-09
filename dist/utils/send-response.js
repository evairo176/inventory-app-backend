"use strict";
// const apiResponseList = async (
//   res,
//   code,
//   message,
//   data = [],
//   totalData = null,
//   perPage = 10,
//   currentPage = null
// ) => {
//   // const user = await ConfigAppModel.findOne();
//   const version = await ConfigAppModel.find();
//   const totalPages = Math.ceil(totalData / perPage);
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
//   const response = {
//     status: parseInt(code),
//     message: message,
//     data: data,
//     total_data: parseInt(totalData),
//     total_page: parseInt(totalPages),
//     page: parseInt(currentPage),
//     current_version: "1.0.7",
//     allowed_version: version.map((item) => item.current_version),
//   };
//   return res.status(code).json(response);
// };
const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data,
    });
};
exports.sendResponse = sendResponse;
