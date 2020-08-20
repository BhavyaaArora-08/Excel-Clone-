const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ejs = require("ejs-electron");
ejs.data({
  title: "Excel Clone",
  rows: 100,
  cols: 26,
});

const createWindow = () => {
  // provides node to electron app
  const win = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
  win.loadFile("index.ejs").then(() => {
    win.maximize();
    win.webContents.openDevTools();
  });
};

app.whenReady().then(createWindow);
