import { readFile } from "fs/promises";
import { Database } from "./database.js";
import { readEpubMeta } from "./epub-meta.js";

async function main() {
  const db = await Database.open();
  const todo = await db.getTodoEpub();
  let count = 0;
  for (const epub of todo) {
    if (count++ > 10) break;
    const meta = await readEpubMeta(epub.Path);
    console.log({ epub, meta });
  }
}

main();
