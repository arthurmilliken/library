import { config } from "dotenv";
config();

const UNDEFINED = "UNDEFINED";

export const DB_PATH = process.env.DB_PATH || "./library.sqlite3";
export const SCAN_ROOT = process.env.SCAN_ROOT || UNDEFINED;
