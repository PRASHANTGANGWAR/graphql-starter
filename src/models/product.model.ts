import mongoose, { Schema } from "mongoose";
import { Product } from "@interface/product.interface";

// Define Product Schema
const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number,required: true },
}, { timestamps: true }); // Adds createdAt & updatedAt

// Create Mongoose model
const ProductModel = mongoose.model<Product>("Products", ProductSchema);

export default ProductModel;
