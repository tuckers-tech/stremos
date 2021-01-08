const path = require('path');

module.exports = directory => {
  let preferencesDirSplit = directory.split(path.sep);

  preferencesDirSplit.pop();

  return preferencesDirSplit.join(path.sep);
};
