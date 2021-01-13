const LoggerBase = require('./LoggerBase');

module.exports = class Controller extends LoggerBase {
  constructor(app, logger, name) {
    super(app, logger, name);
  }
};
