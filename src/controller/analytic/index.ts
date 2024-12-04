import expressAsyncHandler from "express-async-handler";
import { db } from "../../lib";
import { sendResponse } from "../../utils";
import {
  subDays,
  subMonths,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";

//----------------------------------------------
// get analytic controller
//----------------------------------------------
// Helper to format dates
const today = new Date();
const yesterday = subDays(today, 1);
export type SalesSummary = {
  //   todayOrders: number;
  //   yesterdayOrders: number;
  //   thisMonthOrders: number;
  //   lastMonthOrders: number;
  totalOrders: number;
  orderPending: number;
  orderProcessing: number;
  orderDelivered: number;
  orderFailed: number;
};

export const getAnalyticController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      // Orders and sales for today
      const todayOrders = await db.lineOrder.count({
        where: {
          createdAt: {
            gte: startOfDay(today),
            lte: endOfDay(today),
          },
        },
      });

      const todaySales = await db.sale.aggregate({
        _sum: {
          salePrice: true,
        },
        where: {
          createdAt: {
            gte: startOfDay(today),
            lte: endOfDay(today),
          },
        },
      });

      // Orders and sales for yesterday
      const yesterdayOrders = await db.lineOrder.count({
        where: {
          createdAt: {
            gte: startOfDay(yesterday),
            lte: endOfDay(yesterday),
          },
        },
      });

      const yesterdaySales = await db.sale.aggregate({
        _sum: {
          salePrice: true,
        },
        where: {
          createdAt: {
            gte: startOfDay(yesterday),
            lte: endOfDay(yesterday),
          },
        },
      });

      // Orders and sales for this month
      const thisMonthOrders = await db.lineOrder.count({
        where: {
          createdAt: {
            gte: startOfMonth(today),
            lte: endOfMonth(today),
          },
        },
      });

      const thisMonthSales = await db.sale.aggregate({
        _sum: {
          salePrice: true,
        },
        where: {
          createdAt: {
            gte: startOfMonth(today),
            lte: endOfMonth(today),
          },
        },
      });

      // Orders and sales for last month
      const lastMonthOrders = await db.lineOrder.count({
        where: {
          createdAt: {
            gte: startOfMonth(subMonths(today, 1)),
            lte: endOfMonth(subMonths(today, 1)),
          },
        },
      });

      const lastMonthSales = await db.sale.aggregate({
        _sum: {
          salePrice: true,
        },
        where: {
          createdAt: {
            gte: startOfMonth(subMonths(today, 1)),
            lte: endOfMonth(subMonths(today, 1)),
          },
        },
      });

      // All-time metrics
      const totalOrders = await db.lineOrder.count();

      const totalSales = await db.sale.aggregate({
        _sum: {
          salePrice: true,
        },
      });

      // Orders by status
      const orderPending = await db.lineOrder.count({
        where: { status: "PENDING" },
      });

      const orderProcessing = await db.lineOrder.count({
        where: { status: "PROCESSING" },
      });

      const orderDelivered = await db.lineOrder.count({
        where: { status: "DELIVERED" },
      });

      const orderFailed = await db.lineOrder.count({
        where: { status: "FAILED" },
      });

      const salesSummary: SalesSummary = {
        // todayOrders,
        // yesterdayOrders,
        // thisMonthOrders,
        // lastMonthOrders,
        totalOrders,
        orderPending,
        orderProcessing,
        orderDelivered,
        orderFailed,
      };

      return sendResponse(res, 200, "Get analytic sales Successfully", {
        salesSummary,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error?.message,
      });
    }
  }
);
