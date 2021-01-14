const IPCController = require('./IPC/IPCController');
const ProjectController = require('./Project/ProjectController');
const ProjectMetadataController = require('./Project/ProjectMetadataController');

module.exports = class ApplicationRuntime extends IPCController {
  constructor(app, logger, controllers) {
    super(app, logger, 'ApplicationRuntime');
    this.options = controllers.options;
    this.stateCtrl = controllers.stateCtrl;
    this.directoryManager = controllers.directoryManager;
    this.preferenceCtrl = controllers.preferenceCtrl;
    this.dataCtrl = controllers.dataCtrl;
    this.windowCtrl = controllers.windowCtrl;
    this.eventBus = controllers.eventBus;

    this.projectMetadataCtrl = new ProjectMetadataController(
      this.app,
      this.logger,
      this.directoryManager.dataDir,
    );

    this.projectCtrl = new ProjectController(this.app, this.logger);

    // this.eventSubscriptions = [];

    this.watchApplicationEvents();
  }

  startRuntime() {
    this.watchUIEvents();
    this.windowCtrl.createWindow();
  }

  watchApplicationEvents() {
    this.eventBus.watch('app-state').subscribe(data => {
      console.log('app state change');
      this.logInfo('app-state', data);
    });

    this.eventBus.watch('window-create').subscribe(data => {
      console.log(data);
    });
  }

  watchUIEvents() {
    this.registerChannelWatcher('preferences::update', ipcEvent => {
      ipcEvent.reply(
        'preferences::update',
        this.preferenceCtrl.getAllPreferences(),
      );
    });
  }

  destroy() {}
};
