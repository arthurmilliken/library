import { open } from "sqlite";
import sqlite3 from "sqlite3";

const sqlInsertDocument =
  "REPLACE INTO Documents (Path, Filename, Extension, Created, SHA256) VALUES (?, ?, ?, ?, ?)";

const sqlInsertMetadata =
  "REPLACE INTO Metadata (SHA256, SHA1, MD5, MIME, Size) VALUES (?, ?, ?, ?, ?)";

const sqlPathExists =
  "SELECT count(Path) as count FROM Documents WHERE Path = ?";

export class Database {
  static async open(filename) {
    const db = await open({ filename, driver: sqlite3.Database });
    return new Database(db);
  }
  constructor(db) {
    this.db = db;
  }
  async insertMeta(meta) {
    await this.db.run(
      sqlInsertDocument,
      meta.path,
      meta.filename,
      meta.extension,
      meta.created,
      meta.sha256
    );
    await this.db.run(
      sqlInsertMetadata,
      meta.sha256,
      meta.sha1,
      meta.md5,
      meta.mime,
      meta.size
    );
  }
  async pathExists(path) {
    const result = await this.db.get(sqlPathExists, path);
    return result && result.count > 0;
  }
}
