import { OrderStatus } from "@/utils/enums";
import { Document } from "mongoose";

export interface Product {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface Order extends Document {
    _id: string;
    customerId: string;
    products: Product[];
    totalAmount: number;
    orderDate: Date;
    status: OrderStatus;
}
