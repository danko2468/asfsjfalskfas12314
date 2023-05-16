import mongoose from "mongoose";

import config from "~/config.ts";

// init mongo
const credentials =
  config.MONGO_USER && config.MONGO_PASSWORD ? `${config.MONGO_USER}:${config.MONGO_PASSWORD}@` : "";

await mongoose.connect(
  `${config.MONGO_PROTOCOL}://${credentials}${config.MONGO_HOST}/${config.MONGO_DB_NAME}${
    config.MONGO_DB_QUERY_STRING ? `?${config.MONGO_DB_QUERY_STRING}` : ""
  }}`,
  { autoIndex: false }
);
