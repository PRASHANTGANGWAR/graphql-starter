import DB from "@/models/index";

export const customerSpendingResolver = {
  Query: {
    getCustomerSpending: async (_: any, { customerId }: { customerId: string }, { Order }: { Order: typeof DB.Order }
    ) => {
      try {
        const orders = await Order.aggregate([
          {
            $match: {
              customerId: customerId,
              status: 'completed'
            }
          },
          {
            $group: {
              _id: '$customerId',
              totalSpent: { $sum: '$totalAmount' },
              averageOrderValue: { $avg: '$totalAmount' },
              lastOrderDate: { $max: '$orderDate' }
            }
          }
        ]);

        if (!orders.length) {
          return {
            customerId,
            totalSpent: 0,
            averageOrderValue: 0,
            lastOrderDate: ""
          };
        }

        // Ensure we have a valid date format
        const lastOrderDate = orders[0].lastOrderDate
          ? new Date(orders[0].lastOrderDate).toISOString()
          : "";

        return {
          customerId,
          totalSpent: orders[0].totalSpent || 0,
          averageOrderValue: orders[0].averageOrderValue || 0,
          lastOrderDate
        };
      } catch (error) {
        console.error('Error in getCustomerSpending:', error);
        return {
          customerId,
          totalSpent: 0,
          averageOrderValue: 0,
          lastOrderDate: ""
        };
      }
    }
  }
}