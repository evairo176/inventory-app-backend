import expressAsyncHandler from "express-async-handler";
import { db } from "../../lib";
import { sendResponse } from "../../utils";

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
  customerName: string;
}

export const createLineOrderController = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const orderItems: OrderLineItem[] = req.body?.orderLineItems;
      const customerData: CustomerData = req.body?.customerData;

      const response = await db.$transaction(async (transaction) => {
        // create line order
        const lineOrder = await transaction.lineOrder.create({
          data: {
            customerId: customerData.customerId,
            customerName: customerData.customerName,
          },
        });

        for (const item of orderItems) {
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
          const lineOrderItem = await transaction.lineOrderItem.create({
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
              customerName: customerData.customerName,
            },
          });
        }

        return lineOrder;
      });
      return sendResponse(res, 200, "Create Line Order Successfully", {
        lineOrder: response,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error?.message,
      });
    }
  }
);
