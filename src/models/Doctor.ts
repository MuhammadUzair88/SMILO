import mongoose, { Schema, model, models } from "mongoose";

// TypeScript interface
export interface IDoctor {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  bio?: string;
  imageUrl: string;
  gender: "MALE" | "FEMALE"; // enum type
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose Schema
const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    speciality: { type: String, required: true },
    bio: { type: String },
    imageUrl: { type: String, required: true },
    gender: { 
      type: String, 
      enum: ["MALE", "FEMALE"], // ✅ enum in Mongoose
      required: true 
    },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    collection: "doctors",
  }
);

// Prevent overwrite error in Next.js
const Doctor = models.Doctor || model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
