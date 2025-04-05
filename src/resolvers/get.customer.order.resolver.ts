import { Order } from '@interface/order.interface';
import DB from '@models/index';

interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    currentPage: number;
    totalPages: number;
}

interface OrderPagination {
    totalCount: number;
    pageInfo: PageInfo;
    orders: Order[];
}

interface Context {
    Order: typeof DB.Order;
}

interface GetCustomerOrdersArgs {
    customerId: string;
    page?: number;
    limit?: number;
}

export const customerOrdersResolver = {
    Query: {
        getCustomerOrders: async (
            _: unknown,
            { customerId, page = 1, limit = 10 }: GetCustomerOrdersArgs,
            { Order }: Context
        ): Promise<OrderPagination> => {
            try {
                // Validate inputs
                if (!customerId) throw new Error('Customer ID is required');
                if (typeof customerId !== 'string') throw new Error('Customer ID must be a string');

                // Execute queries
                const skip = (Math.max(1, page) - 1) * Math.min(limit, 100);

                const [totalCount, orders] = await Promise.all([
                    Order.countDocuments({ customerId }),
                    Order.find({ customerId })
                        .sort({ orderDate: -1 })
                        .skip(skip)
                        .limit(Math.min(limit, 100))
                        .lean()
                ]);

                return {
                    totalCount,
                    pageInfo: {
                        hasNextPage: page * limit < totalCount,
                        hasPreviousPage: page > 1,
                        currentPage: page,
                        totalPages: Math.ceil(totalCount / limit)
                    },
                    orders: orders as Order[]
                };
            } catch (error) {
                console.error('Order Query Failed:', {
                    error: error instanceof Error ? error.message : String(error),
                    customerId
                });
                throw new Error(`Failed to fetch customer orders: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }
};