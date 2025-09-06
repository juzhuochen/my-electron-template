import { AppInfo, IpcResponse } from "../../shared/types";

export const appInfoService = {
  getAppInfo: async (): Promise<IpcResponse<AppInfo>> => {
    return window.electronAPI.getAppInfo();
  },
};
