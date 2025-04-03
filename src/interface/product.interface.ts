import { Document } from "mongoose";

export interface Product extends Document {
    name: string;
    category: string;
    price: number;
    stock: number; 
}
