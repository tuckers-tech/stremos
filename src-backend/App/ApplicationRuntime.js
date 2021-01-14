const IPCController = require('./IPC/IPCController');

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

    this.eventSubscriptions = [];

    this.watchApplicationEvents();
  }

  startRuntime() {
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

  destroy() {}
};
