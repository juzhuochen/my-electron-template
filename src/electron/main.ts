import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import * as path from "path";
import { isDev } from "./util.js";
import { registerDbHandlers } from "./ipc/dbHandlers.js";
import { initDatabase } from "./database/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:3247");
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(app.getAppPath(), "dist-react", "index.html")
    );
  }
};

app.whenReady().then(async () => {
  // Initialize database
  await initDatabase();

  // Register IPC handlers
  registerDbHandlers();

  // Create the main window
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
