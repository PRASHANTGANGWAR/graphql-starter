import { Document } from "mongoose";

export interface Product extends Document {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
}
