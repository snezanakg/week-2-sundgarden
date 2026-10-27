
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Get database settings from .env
const {
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

// Check that all required settings exist
if (
  !DB_DATABASE ||
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_HOST ||
  !DB_PORT
) {
  throw new Error("Missing database environment variables");
}

const port = Number(DB_PORT);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("Invalid database port");
}

// Create Sequelize connection
export const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port,
    dialect: "postgres",
    logging: console.log,
  }
);
