const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const Controller = require('../Parents/Controller');

module.exports = class WindowController extends Controller {
  constructor(app, logger, eventBus, isDevEnv) {
    super(app, logger, 'WindowController\t');

    this.eventBus = eventBus;

    this.isDevEnv = isDevEnv;

    this.mainWindow = null;
  }

  createWindow() {
    this.logInfo('Creating Window', 'App.js\t\t');

    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, '/..', '/..', 'preload', 'preload.js'),
      },
    });

    if (this.isDevEnv) {
      win.webContents.openDevTools();

      win.loadURL('http://localhost:8080');
    } else {
      win.loadURL(
        url.format({
          pathname: path.join(this.app.getAppPath(), 'dist', 'index.html'),
          protocol: 'file:',
          slashes: true,
        }),
      );
      win.webContents.openDevTools();
    }

    this.mainWindow = win;
  }

  destroy() {}
};
