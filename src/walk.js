import dir from "node-dir";
import { DB_PATH, SCAN_ROOT } from "./config.js";
import { parseMeta } from "./meta.js";
import { Database } from "./database.js";

const LIMIT = 0;

export async function walk() {
  const files = await dir.promiseFiles(SCAN_ROOT);
  const db = await Database.open(DB_PATH);
  let count = 0;
  let skipped = 0;
  let saved = 0;
  for (const file of files) {
    if (LIMIT && ++count > LIMIT) break;
    if (await db.pathExists(file)) {
      skipped++;
      console.log(`skip: ${file}`);
      continue;
    }
    const meta = await parseMeta(file);
    await db.insertMeta(meta);
    saved++;
    console.log(`save: ${file}`);
  }
  console.log(`\nsaved ${saved} documents total.`);
  console.log(`skipped ${skipped} documents total.`);
}
