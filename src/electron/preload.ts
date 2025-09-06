import { contextBridge, ipcRenderer } from "electron";
import { IPC_EVENTS } from "../shared/types";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  getAppInfo: () => ipcRenderer.invoke(IPC_EVENTS.GET_APP_INFO),
});

// Global type declarations
declare global {
  interface Window {
    electronAPI: {
      openFile: () => Promise<string>;
      onMenuFileOpen: (callback: () => void) => void;
      onMenuFileNew: (callback: () => void) => void;
      getAppInfo: () => Promise<
        import("../shared/types").IpcResponse<import("../shared/types").AppInfo>
      >;
    };
  }
}

export {}; // Make this file a module
