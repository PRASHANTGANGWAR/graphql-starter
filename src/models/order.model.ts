import mongoose, { Schema } from "mongoose";
import { Order } from "@interface/order.interface";
import { OrderStatus } from "@utils/enums"

// Define Product Schema (Subdocument)
const ProductSchema: Schema = new Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true }
});

// Define Order Schema
const OrderSchema: Schema = new Schema({
    _id: { type: String, required: true },
    customerId: {
        type: String,
        ref: 'Customers', // Reference the 'Customers' model
        required: true
    },
    products: { type: [ProductSchema], required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: OrderStatus,
        required: true
    }
}, {
    timestamps: true,
    _id: false  // Disable automatic _id generation
});

// Create Mongoose model
const OrderModel = mongoose.model<Order>("Orders", OrderSchema);

export default OrderModel;
