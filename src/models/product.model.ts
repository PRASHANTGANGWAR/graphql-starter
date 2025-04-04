import mongoose, { Schema } from "mongoose";
import { Product } from "@interface/product.interface";

// Define Product Schema
const ProductSchema: Schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: true,
    _id: false  // Disable automatic _id generation
});

// Create Mongoose model
const ProductModel = mongoose.model<Product>("Products", ProductSchema);

export default ProductModel;
