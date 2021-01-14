const { ipcMain } = require('electron');
const Controller = require('../Parents/Controller');
const validChannels = require('./constants/validChannels');

module.exports = class IPCController extends Controller {
  constructor(app, logger, name) {
    super(app, logger, name);

    this.channelsToWatch = [];
  }

  registerChannelWatcher(channel, callback) {
    if (validChannels.includes(channel)) {
      let channelWatcher = ipcMain.on(channel, callback);
      this.channelsToWatch.push(channelWatcher);
    } else {
      this.logError(`Channel ${channel} is not an allowed channel`);
    }
  }

  sendToUI(targetWindow, channel, eventData) {
    if (validChannels.includes(channel)) {
      targetWindow.webContents.send(channel, eventData);
    } else {
      this.logError(`Channel ${channel} is not an allowed channel`);
    }
  }
};
