import { OrderStatus } from "@/utils/enums";
import { Document } from "mongoose";

export interface Product {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface Order extends Document {
    customerId: string;
    products: Product[];
    totalAmount: number;
    orderDate: Date; 
    status: OrderStatus;
}
