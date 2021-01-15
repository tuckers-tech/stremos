const { dialog } = require('electron');
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
    this.watchControllerEvents();
    this.windowCtrl.createWindow();
  }

  watchApplicationEvents() {
    this.eventBus.watch('app-state').subscribe(data => {
      this.logInfo('app-state', data);
    });

    this.eventBus.watch('window-create').subscribe(data => {
      console.log(data);
    });
  }

  watchControllerEvents() {
    this.watchUtilityEvents();
    this.watchProjectMetadataEvents();
    this.watchUIEvents();
  }

  watchUtilityEvents() {
    this.registerChannelWatcher(
      'utilities::select-path',
      (ipcEvent, options) => {
        dialog
          .showOpenDialog(this.windowCtrl.windowArray[0], options)
          .then(path => {
            ipcEvent.reply('utilities::select-path', path);
          })
          .catch(err => console.log(err));
      },
    );
  }

  watchProjectMetadataEvents() {
    this.registerChannelWatcher('project-metadata::update', ipcEvent => {
      ipcEvent.reply(
        'project-metadata::update',
        this.projectMetadataCtrl.getProjectMetadata(),
      );
    });

    this.registerChannelWatcher(
      'project-metadata::create',
      (ipcEvent, projectData) => {
        console.log(projectData);
        ipcEvent.reply('project-metadata::create', { data: 'return data' });
      },
    );

    this.registerChannelWatcher(
      'project-metadata::create',
      (ipcEvent, projectData) => {
        console.log(projectData);
        ipcEvent.reply('project-metadata::create', { data: 'return data' });
      },
    );
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
