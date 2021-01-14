const { contextBridge, ipcRenderer } = require('electron');
const validChannels = require('../App/IPC/constants/validChannels');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipc', {
  send: (channel, data) => {
    // whitelist channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.log('not a valid channel');
    }
  },
  watch: (channel, func) => {
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      console.log('not a valid channel');
    }
  },
});
