import { Document } from "mongoose";

export interface Product {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface Order extends Document {
    customerId: string;
    products: Product[]; // Array of objects
    totalAmount: number;
    orderDate: Date; 
    status: "pending" | "shipped" | "delivered" | "cancelled";
}
