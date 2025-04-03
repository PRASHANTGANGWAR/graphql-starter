import { Document } from "mongoose";

// Define the interface for TypeScript
export interface Customer extends Document {
    name: string;
    email: string;
    age: number;
    location: string;
    gender: "male" | "female" | "other";
}
