import DB from "@/models/index";
import { Types } from 'mongoose';
import { Product } from "@interface/product.interface";

interface OrderResponse {
    _id: string;
    customerId: string;
    products: Array<{
        productId: string;
        quantity: number;
        priceAtPurchase: number;
    }>;
    totalAmount: number;
    orderDate: Date;
    status: string;
}

export const placeOrderResolver = {
    Mutation: {
        placeOrder: async (
            _: any,
            { customerId, products }: { customerId: string; products: Array<{ productId: string; quantity: number }> },
            { Order, Customer, Product }: {
                Order: typeof DB.Order,
                Customer: typeof DB.Customer,
                Product: typeof DB.Product
            }
        ): Promise<OrderResponse> => {
            try {
                // Validate customer exists
                const customer = await Customer.findOne({ _id: customerId });
                if (!customer) throw new Error('Customer not found');

                // Process products
                let totalAmount = 0;
                const productEntries = await Promise.all(
                    products.map(async (item) => {
                        const product = await Product.findOne({ _id: item.productId }).lean<Product>();
                        if (!product) throw new Error(`Product ${item.productId} not found`);
                        if (product.stock < item.quantity) {
                            throw new Error(`Insufficient stock for ${product.name}`);
                        }

                        const priceAtPurchase = product.price;
                        totalAmount += priceAtPurchase * item.quantity;

                        return {
                            productId: product._id.toString(),
                            quantity: item.quantity,
                            priceAtPurchase
                        };
                    })
                );

                // Create order with stringified products
                const order = new Order({
                    _id: new Types.ObjectId().toString(),
                    customerId,
                    products: JSON.stringify(productEntries), // Store as JSON string
                    totalAmount,
                    orderDate: new Date(),
                    status: 'pending',
                });

                //  Save order
                const savedOrder = await order.save();

                //  Update stock levels
                await Promise.all(
                    products.map(item =>
                        Product.updateOne(
                            { _id: item.productId },
                            { $inc: { stock: -item.quantity } }
                        )
                    )
                );

                // Return response with parsed products
                return {
                    _id: savedOrder._id,
                    customerId: savedOrder.customerId,
                    products: productEntries,
                    totalAmount: savedOrder.totalAmount,
                    orderDate: savedOrder.orderDate,
                    status: savedOrder.status
                };

            } catch (error: any) {
                console.error('Error placing order:', error);
                throw new Error(`Failed to place order: ${error.message}`);
            }
        },
    },
};