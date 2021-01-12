const { contextBridge, ipcRenderer } = require('electron');
const mainChannels = require('../App/IPC/constants/mainChannels');
const renderChannels = require('../App/IPC/constants/renderChannels');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipc', {
  send: (channel, data) => {
    // whitelist channels
    if (mainChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.log('not a valid channel');
    }
  },
  receive: (channel, func) => {
    if (renderChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      console.log('not a valid channel');
    }
  },
});
