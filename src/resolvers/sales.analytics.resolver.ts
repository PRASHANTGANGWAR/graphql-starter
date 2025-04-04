import DB from "@/models/index";

export const salesAnalyticsResolver = {
  Query: {
    getSalesAnalytics: async (
      _: unknown,
      { startDate, endDate }: { startDate: string; endDate: string },
      { Order }: {
        Order: typeof DB.Order;
      }
    ): Promise<any> => {
      try {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const analytics = await Order.aggregate([
          {
            $match: {
              orderDate: { $gte: start, $lte: end },
              status: 'completed'
            }
          },
          {
            $addFields: {
              parsedProducts: {
                $function: {
                  body: function (productsString: string) {
                    try {
                      // Convert to valid JSON format
                      const jsonStr = productsString
                        .replace(/'/g, '"')  // Replace single quotes
                        .replace(/\\/g, ''); // Remove any backslashes
                      return JSON.parse(jsonStr);
                    } catch (e) {
                      console.error('Error parsing products:', e);
                      return [];
                    }
                  },
                  args: ["$products"],
                  lang: "js"
                }
              }
            }
          },
          { $unwind: "$parsedProducts" },
          {
            $addFields: {
              quantity: { $toDouble: "$parsedProducts.quantity" },
              price: { $toDouble: "$parsedProducts.priceAtPurchase" },
              productId: "$parsedProducts.productId"
            }
          },
          {
            $lookup: {
              from: "products",
              let: { pid: "$productId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$pid"] }
                  }
                },
                { $project: { category: 1 } }
              ],
              as: "productInfo"
            }
          },
          { $unwind: { path: "$productInfo", preserveNullAndEmptyArrays: true } },
          {
            $group: {
              _id: {
                category: {
                  $ifNull: ["$productInfo.category", "Uncategorized"]
                }
              },
              revenue: {
                $sum: { $multiply: ["$quantity", "$price"] }
              }
            }
          },
          {
            $project: {
              category: "$_id.category",
              revenue: 1,
              _id: 0
            }
          },
          { $match: { revenue: { $gt: 0 } } }
        ]);

        // Calculate totals
        const totals = await Order.aggregate([
          {
            $match: {
              orderDate: { $gte: start, $lte: end },
              status: 'completed'
            }
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$totalAmount" },
              orderCount: { $sum: 1 }
            }
          }
        ]);

        return {
          totalRevenue: totals[0]?.totalRevenue || 0,
          completedOrders: totals[0]?.orderCount || 0,
          categoryBreakdown: analytics
        };

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Sales analytics error:', error);
        throw new Error(`Failed to fetch sales analytics: ${errorMessage}`);
      }
    }
  }
}