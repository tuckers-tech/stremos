const Controller = require('../Parents/Controller');

module.exports = class ProjectController extends Controller {
  constructor(app, logger) {
    super(app, logger, 'ProjectController');

    this.isProjectLoaded = false;
  }
};
