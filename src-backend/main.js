const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let isDevEnv = false;

if (process.argv.includes('--dev')) {
  isDevEnv = true;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload', 'preload.js'),
    },
  });

  if (isDevEnv) {
    win.webContents.openDevTools();

    win.loadURL('http://localhost:8080');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(app.getAppPath(), 'dist', 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
    win.webContents.openDevTools();
  }
  ipcMain.on('toMain', (event, args) => {
    console.log(event, args);

    win.webContents.send('fromMain', 'return data');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
