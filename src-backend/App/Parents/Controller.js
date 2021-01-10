module.exports = class Controller {
  constructor(app, logger, name) {
    this.app = app;
    this.loggerCurrentFile = name;
    this.logger = logger;
  }

  logInfo(logString) {
    this.logger.logInfo(logString, this.loggerCurrentFile);
  }

  logWarn(logString) {
    this.logger.logWarn(logString, this.loggerCurrentFile);
  }

  logError(logString) {
    this.logger.logError(logString, this.loggerCurrentFile);
  }

  logSuccess(logString) {
    this.logger.logSuccess(logString, this.loggerCurrentFile);
  }
};
