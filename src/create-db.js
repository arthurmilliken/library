import { readFile } from "fs/promises";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

import { DB_PATH } from "./config.js";

async function main() {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
  const sql = await readFile("./sql/library-schema.sql", "utf8");
  await db.exec(sql);
  console.log(`created database at ${DB_PATH}`);
}

main();
