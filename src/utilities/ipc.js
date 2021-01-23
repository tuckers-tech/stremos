function requestData(channel, dataToSend) {
  return new Promise(resolve => {
    window.ipc.watchOnce(channel, result => {
      resolve(result);
    });

    window.ipc.send(channel, dataToSend);
  });
}

/**
 *
 * @param {Object} options Option object from https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options
 */
function requestPath(options) {
  return new Promise((resolve, reject) => {
    requestData('utilities::select-path', options)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

module.exports = {
  requestData,
  requestPath,
};
