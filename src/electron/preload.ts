import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  onMenuFileOpen: (callback: () => void) =>
    ipcRenderer.on('menu-file-open', callback),
  onMenuFileNew: (callback: () => void) =>
    ipcRenderer.on('menu-file-new', callback),
  // Add more API methods as needed
});

// Define types for TypeScript
declare global {
  interface Window {
    electronAPI: {
      openFile: () => Promise<string>;
      onMenuFileOpen: (callback: () => void) => void;
      onMenuFileNew: (callback: () => void) => void;
    };
  }
}
