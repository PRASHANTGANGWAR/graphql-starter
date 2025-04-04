import DB from "@/models/index";

export const topSellingProductsResolver = {
  Query: {

    getTopSellingProducts: async (
      _: any,
      { limit }: { limit: number },
      { Order, Product }: { Order: typeof DB.Order, Product: typeof DB.Product }
    ) => {
      try {
        // Aggregate orders to calculate total quantities sold
        const productSales = await Order.aggregate([
          // Filter out canceled orders
          { $match: { status: { $ne: 'canceled' } } },

          // Parse the stringified products array
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
            $group: {
              _id: "$parsedProducts.productId",
              totalSold: { $sum: "$parsedProducts.quantity" }
            }
          },
          { $sort: { totalSold: -1 } },
          { $limit: limit }
        ]);

        // Get product details for each top product
        const topProducts = await Promise.all(
          productSales.map(async (sale: any) => {
            const product = await Product.findOne({
              _id: sale._id
            }).lean();

            return {
              productId: sale._id,
              name: product?.name || 'Unknown Product',
              totalSold: sale.totalSold
            };
          })
        );

        return topProducts;
      } catch (error) {
        console.error('Error in getTopSellingProducts:', error);
        throw new Error('Failed to fetch top selling products');
      }

    }
  }
}
