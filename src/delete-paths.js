import { readFile } from "fs/promises";
import { DB_PATH } from "./config.js";
import { Database } from "./database.js";

const DELETE_PATHS = "_ignore/DELETE_PATHS.txt";

async function main() {
  const db = await Database.open(DB_PATH);
  const content = await readFile(DELETE_PATHS, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const fpath = line.trim();
    await db.deletePath(fpath);
    console.log(`deleted: ${fpath}`);
  }
}

main();
