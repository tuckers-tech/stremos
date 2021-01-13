const { ipcMain } = require('electron');
const Controller = require('../Parents/Controller');
const mainChannels = require('./constants/mainChannels');
const renderChannels = require('./constants/renderChannels');

module.exports = class IPCController extends Controller {
  constructor(app, logger, name) {
    super(app, logger, name);

    // ipcMain.on('toMain', () => {
    //   win.webContents.send('fromMain', 'return data');
    // });
  }
};
