import mongoose, { Schema } from "mongoose";
import { Customer } from "@interface/customer.interface";
import { Gender } from "@utils/enums"

// Define Mongoose Schema
const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    gender: { type: String, enum: Gender, required: true },
}, {
    timestamps: true
});

// Create Mongoose model
const CustomerModel = mongoose.model<Customer>("Customers", CustomerSchema);

export default CustomerModel;
