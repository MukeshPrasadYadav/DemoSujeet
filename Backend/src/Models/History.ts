import mongoose, { Document, Model, Schema } from "mongoose";

export interface History {
  userID: string;
  amount: number;
  profit: number;
  loss: number;
  time?: Date; // optional, timestamps will auto-generate
}

export interface IHistory extends History, Document {}

const HistorySchema = new Schema<IHistory>(
  {
    userID: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    profit: {
      type: Number,
      required: true,
      default: 0,
    },
    loss: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const History: Model<IHistory> = mongoose.model<IHistory>("History", HistorySchema);
export default History;
