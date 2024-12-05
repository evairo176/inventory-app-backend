import expressAsyncHandler from "express-async-handler";
import { db } from "../../lib";
import { generateOrderNumber, sendResponse } from "../../utils";

//----------------------------------------------
// create line order controller
//----------------------------------------------
interface OrderLineItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  productThumbnail: string;
}

interface CustomerData {
  customerId: string;
}

export const createLineOrderController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const orderItems: OrderLineItem[] = req.body?.orderItems;
      const customerData: CustomerData = req.body?.customerData;

      const orderType = "Sale";

      const subTotal = orderItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      const taxPercent = 10;
      const tax = (taxPercent * subTotal) / 100;
      const totalSum = subTotal + tax;
      const orderAmount: number = totalSum;

      const customerExisting = await db.customer.findFirst({
        where: {
          id: customerData.customerId,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      if (!customerExisting) {
        return sendResponse(res, 404, "Customer not found");
      }

      const response = await db.$transaction(async (transaction) => {
        // create line order
        const lineOrder = await transaction.lineOrder.create({
          data: {
            customerId: customerExisting?.id,
            customerName: customerExisting?.user.name as string,
            customerEmail: customerExisting?.user.email,
            orderNumber: generateOrderNumber(),
            orderAmount,
            orderType,
          },
        });

        for (const item of orderItems) {
          // Cek stock qty dari produk
          const product = await transaction.product.findUnique({
            where: {
              id: item.id,
            },
            select: {
              stockQty: true,
            },
          });

          // Jika stok kosong atau kurang dari qty yang dipesan, kembalikan error
          if (!product || product.stockQty < item.qty) {
            throw new Error(
              `Insufficient stock for product: ${item.name}. Available: ${
                product?.stockQty ?? 0
              }, requested: ${item.qty}`
            );
          }

          // update product stock qty
          await transaction.product.update({
            where: {
              id: item.id,
            },
            data: {
              stockQty: {
                decrement: item.qty,
              },
            },
          });

          // create line order item
          await transaction.lineOrderItem.create({
            data: {
              orderId: lineOrder.id,
              productId: item.id,
              name: item.name,
              price: item.price,
              qty: item.qty,
              productThumbnail: item.productThumbnail,
            },
          });

          // create sale
          await transaction.sale.create({
            data: {
              orderId: lineOrder.id,
              productId: item.id,
              qty: item.qty,
              salePrice: item.price,
              productName: item.name,
              productImage: item.productThumbnail,
              customerName: customerExisting.user.name as string,
              customerEmail: customerExisting.user.email as string,
            },
          });
        }

        return lineOrder;
      });
      return sendResponse(res, 200, "Create Line Order Successfully", {
        lineOrder: response,
      });
    } catch (error: any) {
      return sendResponse(res, 500, "Internal Server Error", {
        error: error?.message,
      });
    }
  }
);

//----------------------------------------------
// get orders controller
//----------------------------------------------
export const getOrderController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const orders = await db.lineOrder.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });

      return sendResponse(res, 200, "get Line Order Successfully", {
        lineOrder: orders,
      });
    } catch (error: any) {
      return sendResponse(res, 500, "Internal Server Error", {
        error: error?.message,
      });
    }
  }
);
