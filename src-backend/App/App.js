const Logger = require('./Logging/Logger');
const { BrowserWindow, session } = require('electron');
const os = require('os');
const DataController = require('./Data/DataController');
const PreferenceController = require('./Preferences/PreferenceController');
const DirectoryManager = require('./FileSystem/DirectoryManager');
const WindowController = require('./Window/WindowController');
const StateController = require('./State/StateController');
const ApplicationRuntime = require('./ApplicationRuntime');
const EventBus = require('./Utilities/EventBus');

module.exports = class App {
  constructor(app, options) {
    this.app = app;
    this.isDevEnv = options.isDevEnv;
    this.options = options;

    if (this.isDevEnv) {
      if (os.platform() === 'win32') {
        session.defaultSession.loadExtension(
          'C:\\Users\\hawki\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0',
        );
      } else if (os.platform() === 'darwin') {
        session.defaultSession.loadExtension(
          '/Users/hawk/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.3.4_0',
        );
      }
    }

    this.logger = new Logger(
      this.isDevEnv,
      this.app.getPath('logs'),
      options.verbose,
    );

    this.eventBus = new EventBus(this.app, this.logger);

    this.stateCtrl = new StateController(this.app, this.logger, this.eventBus);

    this.stateCtrl.goToState('startup');

    this.directoryManager = new DirectoryManager(this.app, this.logger);

    this.directoryManager.ensureApplicationDirectoriesExist();

    this.preferenceCtrl = new PreferenceController(
      this.app,
      this.logger,
      this.directoryManager.preferencesDir,
    );

    this.dataCtrl = new DataController(
      this.app,
      this.logger,
      this.directoryManager.dataDir,
    );

    this.windowCtrl = new WindowController(
      this.app,
      this.logger,
      this.eventBus,
      this.isDevEnv,
    );

    this.appRuntime = new ApplicationRuntime(this.app, this.logger, {
      options,
      stateCtrl: this.stateCtrl,
      directoryManager: this.directoryManager,
      preferenceCtrl: this.preferenceCtrl,
      dataCtrl: this.dataCtrl,
      windowCtrl: this.windowCtrl,
      eventBus: this.eventBus,
    });
  }

  start() {
    this.registerApplicationListeners();

    this.appRuntime.startRuntime();
  }

  registerApplicationListeners() {
    this.app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.destroy();
        this.app.quit();
      }
    });

    this.app.on('quit', () => {
      this.destroy();
    });

    this.app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }

  destroy() {
    this.logger.destroy();
    this.preferenceCtrl.destroy();
    this.dataCtrl.destroy();
    this.windowCtrl.destroy();
  }
};
