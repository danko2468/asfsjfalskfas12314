import mongoose, { Schema } from "npm:mongoose@^7";
import * as yup from "npm:yup@^1.1";
import { load } from "https://deno.land/std@0.185.0/dotenv/mod.ts";
import { fromFileUrl } from "https://deno.land/std@0.185.0/path/mod.ts";

console.time("Done in");

await load({
  envPath: fromFileUrl(new URL("./.env", import.meta.url)),
  examplePath: null,
  export: true,
});

const config = await yup.object({
  MONGO_PROTOCOL: yup.string().required(),
  MONGO_HOST: yup.string().required(),
  MONGO_USER: yup.string().optional(),
  MONGO_PASSWORD: yup.string().optional(),
  MONGO_DB_NAME: yup.string().required(),
}).validate({
  MONGO_PROTOCOL: Deno.env.get("MONGO_PROTOCOL")!,
  MONGO_HOST: Deno.env.get("MONGO_HOST")!,
  MONGO_USER: Deno.env.get("MONGO_USER")!,
  MONGO_PASSWORD: Deno.env.get("MONGO_PASSWORD")!,
  MONGO_DB_NAME: Deno.env.get("MONGO_DB_NAME")!,
}).catch((err) => {
  throw new Error(err.message);
});

const credentials = config.MONGO_USER && config.MONGO_PASSWORD
  ? `${config.MONGO_USER}:${config.MONGO_PASSWORD}@`
  : "";

await mongoose.connect(
  `${config.MONGO_PROTOCOL}://${credentials}${config.MONGO_HOST}/${config.MONGO_DB_NAME}}`,
  { autoIndex: false } as never,
);

const todoModel = mongoose.model(
  "todos",
  new Schema({
    title: String,
    description: String,
    deletedAt: Date,
  }, { timestamps: true }),
  "todos",
);

await todoModel.collection.createIndex({ title: 1 });
await todoModel.collection.createIndex({ description: 1 });
await todoModel.collection.createIndex({ deletedAt: 1 }, {
  expireAfterSeconds: 60 * 60 * 24, // 1 day
});

await mongoose.disconnect();

console.timeEnd("Done in");

Deno.exit(0);
