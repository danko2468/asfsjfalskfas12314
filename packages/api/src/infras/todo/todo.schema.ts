import { Schema, model } from "mongoose";

import type { Types } from "mongoose";

const collectionName = "todos";

export type TodoDocument = {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

const schema = new Schema<TodoDocument>(
  {
    title: String,
    description: String,
    deletedAt: Date,
  },
  { timestamps: true }
);

export default model<TodoDocument>(collectionName, schema, collectionName);
