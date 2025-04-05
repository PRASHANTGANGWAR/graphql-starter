import { Gender } from "@/utils/enums";
import { Document } from "mongoose";

export interface Customer extends Document {
    _id: string;
    name: string;
    email: string;
    age: number;
    location: string;
    gender: Gender
}
