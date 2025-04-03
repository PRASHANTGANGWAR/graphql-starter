import mongoose, { Schema } from "mongoose";
import { Order } from "@interface/order.interface";
import { Status } from "@utils/enums"

// Define Product Schema (Subdocument)
const ProductSchema: Schema = new Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

// Define Order Schema
const OrderSchema: Schema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId, // Store the ObjectId of the Customer
        ref: 'Customers', // Reference the 'Customers' model
        required: true
    },
    products: { type: [ProductSchema], required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: Status,
        required: true
    }
}, { timestamps: true }); // Adds createdAt & updatedAt

// Create Mongoose model
const OrderModel = mongoose.model<Order>("Orders", OrderSchema);

export default OrderModel;
