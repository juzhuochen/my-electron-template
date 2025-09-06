// shared types
export interface AppInfo {
  version: string;
  creation_date: string;
}

// ipc interface
export interface IpcResponse<T> {
  isSuccess: boolean;
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
}

// ipc event types
export const IPC_EVENTS = {
  GET_APP_INFO: "get-app-info",
};
