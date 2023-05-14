import "dotenv/config";
import * as yup from "yup";

const PACKAGE_VERSION = process.env.npm_package_version;

const schema = yup.object().shape({
  NODE_ENV: yup.string().default("development"),
  PACKAGE_VERSION: yup.string().default("0.0.0"),
  JWT_SECRET: yup.string().required(),
  PORT: yup.number().default(3000),
  MONGO_PROTOCOL: yup.string().required(),
  MONGO_USER: yup.string().optional(),
  MONGO_PASSWORD: yup.string().optional(),
  MONGO_HOST: yup.string().required(),
  MONGO_DB_NAME: yup.string().required(),
});

let config: ReturnType<typeof schema.validateSync>;

try {
  config = await schema.validate(
    {
      NODE_ENV: process.env.NODE_ENV,
      PACKAGE_VERSION,
      PORT: process.env.PORT,
      JWT_SECRET: process.env.JWT_SECRET,
      MONGO_PROTOCOL: process.env.MONGO_PROTOCOL,
      MONGO_USER: process.env.MONGO_USER,
      MONGO_PASSWORD: process.env.MONGO_PASSWORD,
      MONGO_HOST: process.env.MONGO_HOST,
      MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    },
    { abortEarly: true }
  );
} catch (error) {
  throw new Error(`Config validation failed: ${error.message}`);
}

export default config;
