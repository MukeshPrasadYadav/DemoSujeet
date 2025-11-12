import mongoose, { Document, Model, Schema } from "mongoose";

// ✅ Define a separate interface for type safety
export interface IUser {
  images: string[];
  countryCode: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "user" | "admin";
  profit: {
    balance: number;
  };
  loss: {
    balance: number;
  };
  wallet: {
    balance: number;
  };
  createdAt: Date;
  updatedAt?: Date;
}

// ✅ Extend Document to include _id and Mongoose-specific fields
export interface IUserDocument extends IUser, Document {}

// ✅ Schema definition
const UserSchema = new Schema<IUserDocument>(
  {
    countryCode: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    images: { type: [String], default: [] },

    profit: {
      balance: { type: Number, default: 0 },
    },

    loss: {
      balance: { type: Number, default: 0 },
    },

    wallet: {
      balance: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// ✅ Create and export model
const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", UserSchema);
export default User;
