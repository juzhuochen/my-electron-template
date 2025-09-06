import { ipcMain } from "electron";
import { IpcResponse, AppInfo, IPC_EVENTS } from "../../shared/types.js";
import { getAppInfo } from "../database/services/appInfoService.js";
import log from "electron-log";

/**
 * Register database-related IPC handlers
 */
export function registerDbHandlers(): void {
  ipcMain.handle(
    IPC_EVENTS.GET_APP_INFO,
    async (): Promise<IpcResponse<AppInfo>> => {
      try {
        const appInfo = getAppInfo();

        if (appInfo) {
          return {
            isSuccess: true,
            data: appInfo,
          };
        } else {
          return {
            isSuccess: false,
            data: null,
            error: {
              code: "NOT_FOUND",
              message: "App info not found",
            },
          };
        }
      } catch (error) {
        log.error("IPC handler for GET_APP_INFO failed:", error);
        return {
          isSuccess: false,
          data: null,
          error: {
            code: "INTERNAL_ERROR",
            message: "An internal error occurred",
          },
        };
      }
    }
  );
}
