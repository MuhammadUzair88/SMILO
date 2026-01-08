import mongoose, { Schema, model, models, Types } from "mongoose";

// TypeScript interface
export interface IAppointment {
  date: Date;
  time: string;
  duration?: number;
  status?: "CONFIRMED" | "COMPLETED";
  notes?: string;
  reason?: string;
  userId: Types.ObjectId;   
  doctorId: Types.ObjectId; 
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose schema
const AppointmentSchema = new Schema<IAppointment>(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, default: 30 },
    status: { type: String, enum: ["CONFIRMED", "COMPLETED"], default: "CONFIRMED" },
    notes: { type: String },
    reason: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  },
  { timestamps: true, collection: "appointments" }
);

// Prevent overwrite in Next.js
const Appointment = models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
