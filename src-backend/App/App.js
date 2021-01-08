const { BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const Logger = require('./Logging/Logger');
const DataController = require('./Data/DataController');
const PreferenceController = require('./Preferences/PreferenceController');

module.exports = class App {
  constructor(app, options) {
    this.app = app;
    this.isDevEnv = options.isDevEnv;
    this.options = options;

    let appDataRootFolder = path.join(this.app.getPath('appData'), 'stremos');

    this.logger = new Logger(
      this.isDevEnv,
      this.app.getPath('logs'),
      options.verbose,
    );
    this.preferenceCtrl = new PreferenceController(
      this.options,
      this.logger,
      appDataRootFolder,
    );
    this.dataCtrl = new DataController(
      this.options,
      this.logger,
      this.preferenceCtrl,
    );
  }

  start() {
    this.registerApplicationListeners();

    this.createWindow();
  }

  registerApplicationListeners() {
    this.app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.app.quit();
      }
    });

    this.app.on('quit', () => {
      this.destroy();
    });

    this.app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }

  createWindow() {
    this.logger.logInfo('Creating Window', 'App.js');

    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, '/..', 'preload', 'preload.js'),
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
    ipcMain.on('toMain', () => {
      win.webContents.send('fromMain', 'return data');
    });
  }

  destroy() {
    this.logger.destroy();
    this.preferenceCtrl.destroy();
    this.dataCtrl.destroy();
  }
};
