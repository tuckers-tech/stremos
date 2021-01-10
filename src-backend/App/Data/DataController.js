const Controller = require('../Parents/Controller');
const SqliteController = require('./SqliteController');

module.exports = class DataController extends Controller {
  constructor(app, logger, dataDir) {
    super(app, logger, 'DataController');

    this.sqlCtrl = new SqliteController(this.app, this.logger, dataDir);
  }

  isDatabaseReady() {
    return this.sqlCtrl.isDatabaseReady;
  }

  destroy() {
    this.sqlCtrl.destroy();
  }
};
