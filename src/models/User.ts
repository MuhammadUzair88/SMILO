import mongoose, { Schema, model, models } from "mongoose";

/**
 * TypeScript interface (for type safety)
 */
export interface IUser {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Mongoose Schema
 */
const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
    collection: "users", // same as @@map("users")
  }
);

/**
 * Export model (prevents overwrite error in Next.js)
 */
const User = models.User || model<IUser>("User", UserSchema);

export default User;
