import { unlink, readFile } from "fs/promises";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { DB_PATH } from "./config.js";

let sql;

export class Database {
  static async open(filename = DB_PATH) {
    if (!sql) {
      const queries = await Promise.all([
        readFile("sql/document-exists.sql", "utf8"),
        readFile("sql/insert-document.sql", "utf8"),
        readFile("sql/insert-metadata.sql", "utf8"),
        readFile("sql/select-dups.sql", "utf8"),
        readFile("sql/select-todo-epub.sql", "utf8"),
        readFile("sql/select-todo-pdf.sql", "utf8"),
      ]);
      sql = {
        documentExists: queries[0].trim(),
        insertDocument: queries[1].trim(),
        insertMetadata: queries[2].trim(),
        selectDups: queries[3].trim(),
        selectTodoEpub: queries[4].trim(),
        selectTodoPdf: queries[5].trim(),
      };
    }
    console.log({ filename });
    const db = await open({ filename, driver: sqlite3.Database });
    return new Database(db);
  }

  constructor(db) {
    this.db = db;
  }

  async insertMeta(meta) {
    await this.db.run(
      sql.insertDocument,
      meta.path,
      meta.filename,
      meta.extension,
      meta.created,
      meta.sha256
    );
    await this.db.run(
      sql.insertMetadata,
      meta.sha256,
      meta.sha1,
      meta.md5,
      meta.mime,
      meta.size
    );
  }

  async pathExists(fpath) {
    const result = await this.db.get(sql.documentExists, fpath);
    return result && result.count > 0;
  }

  async deletePath(fpath) {
    // Delete fpath from Documents
    await this.db.run(sql.deletePath, fpath);
    // Delete fpath from filesystem
    await unlink(fpath);
  }

  async getTodoEpub() {
    console.log({ sql });
    return await this.db.all(sql.selectTodoEpub);
  }
}
