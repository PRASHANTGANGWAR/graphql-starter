import { Gender } from "@/utils/enums";
import { Document } from "mongoose";

export interface Customer extends Document {
    name: string;
    email: string;
    age: number;
    location: string;
    gender: Gender
}
