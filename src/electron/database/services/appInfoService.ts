import db from "../db.js";
import { AppInfo } from "../../../shared/types.js";
import log from "electron-log";

export function getAppInfo(): AppInfo | null {
  try {
    const stmt = db.prepare(
      "SELECT version, creation_date FROM app_info WHERE id = 1"
    );
    const result = stmt.get() as AppInfo | undefined;

    if (result) {
      log.info("Successfully retrieved app info from database.");
      return result;
    } else {
      log.warn("No app info found in database.");
      return null;
    }
  } catch (error) {
    log.error("Failed to get app info:", error);
    return null;
  }
}
