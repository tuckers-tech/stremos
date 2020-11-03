const { app, BrowserWindow } = require('electron');
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
      nodeIntegration: true,
      allowRunningInsecureContent: isDevEnv ? true : false
    }
  });

  if (isDevEnv) {
    win.webContents.openDevTools();

    win.loadURL('http://localhost:8080');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(app.getAppPath(), 'dist', 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
    win.webContents.openDevTools();
  }

  win.webContents.openDevTools();
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
