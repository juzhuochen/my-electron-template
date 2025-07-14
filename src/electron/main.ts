import { app, BrowserWindow } from "electron";
import { isDev } from "./util.js";

import path from "path";
const createWindow = () => {
    const mainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                // preload part
            }

        }
    )
    if (isDev()) {
        mainWindow.loadURL("http://localhost:3247");
    }
    else {

        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }
}
app.whenReady().then(() => {
    // before creating the window, we can do some initial setup
    // like setting up IPC handlers, etc.
    createWindow();
}
)