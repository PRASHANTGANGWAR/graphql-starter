import mongoose from "mongoose";
import { MONGOURI } from "@config/index"

const mongoURI: string = MONGOURI

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;
