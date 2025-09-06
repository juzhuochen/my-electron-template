import { app } from "electron";
import * as path from "path";
import Database from "better-sqlite3";
import log from "electron-log";

log.transports.file.fileName = "database.log";

const dbPath = path.join(app.getPath("userData"), "app.db");
const db = new Database(dbPath);

export function initDatabase(): void {
  try {
    const createTableStmt = db.prepare(
      `
      CREATE TABLE IF NOT EXISTS app_info (
        id INTEGER PRIMARY KEY,
        version TEXT NOT NULL,
        creation_date TEXT NOT NULL
      );
      `
    );
    createTableStmt.run();

    const checkExistsStmt = db.prepare(
      "SELECT COUNT(*) as count FROM app_info"
    );
    const { count } = checkExistsStmt.get() as { count: number };

    if (count === 0) {
      const insertStmt = db.prepare(`
        INSERT INTO app_info (id, version, creation_date)
        VALUES (1, ?, ?);
      `);
      insertStmt.run("1.0.0", new Date().toISOString());
      log.info("App info table created and initialized.");
    } else {
      log.info("App info table already exists.");
    }
  } catch (error) {
    log.error("Failed to init database:", error);
    throw error;
  }
}

export default db;
