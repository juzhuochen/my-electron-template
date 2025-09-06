// Type definitions for Electron API exposed to renderer
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

export {};
