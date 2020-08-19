const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const createWindow = () => {
  // provides node to electron app
  const win = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
  win.loadFile("index.html").then(() => {
    win.maximize();
    win.webContents.openDevTools();
  });
};

app.whenReady().then(createWindow);
