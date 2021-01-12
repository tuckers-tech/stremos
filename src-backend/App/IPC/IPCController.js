const { ipcMain } = require('electron');
const Controller = require('../Parents/Controller');
const mainChannels = require('./constants/mainChannels');
const renderChannels = require('./constants/renderChannels');

module.exports = class IPCController extends Controller {
  constructor(app, logger) {
    super(app, logger, 'IPCController');

    // ipcMain.on('toMain', () => {
    //   win.webContents.send('fromMain', 'return data');
    // });
  }
};
