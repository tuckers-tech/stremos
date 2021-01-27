const Controller = require('../../Parents/Controller');
const fs = require('fs-extra');
const path = require('path');
const { resolve } = require('path');

module.exports = class PluginController extends Controller {
  constructor(app, logger, directoryManager) {
    super(app, logger, 'Plugin Controller\t');
    this.directoryManager = directoryManager;
    this.pluginDir = this.directoryManager.pluginDir;
    this.loadedPlugins = [];
  }

  loadPlugins() {
    return new Promise((resolve, reject) => {
      this.getPluginNames().then(pluginNames => {
        const pluginLoader = [];

        pluginNames.forEach(pluginName => {
          pluginLoader.push(this.loadSinglePlugin(pluginName));
        });

        Promise.all(pluginLoader)
          .then(pluginData => {
            this.loadedPlugins = pluginData;
            resolve(pluginData);
          })
          .catch(err => this.logError(err));
      });
    });
  }

  getPluginNames() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.pluginDir)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  loadSinglePlugin(pluginName) {
    return new Promise((resolve, reject) => {
      const pluginPath = path.join(this.pluginDir, pluginName, 'plugin.json');
      const blockPath = path.join(this.pluginDir, pluginName, 'blocks');
      const templatePath = path.join(this.pluginDir, pluginName, 'templates');
      const dataPath = path.join(this.pluginDir, pluginName, 'schemas');

      Promise.all([
        this.getPluginMetadata(pluginPath),
        this.getAllBlockData(blockPath),
        this.getAllTemplates(templatePath),
        this.getAllData(dataPath),
      ])
        .then(data => {
          resolve({
            ...data[0],
            blocks: data[1],
            templates: data[2],
            schemas: data[3],
          });
        })
        .catch(err => reject(err));
    });
  }

  getPluginMetadata(pluginPath) {
    return new Promise((resolve, reject) => {
      fs.readJSON(pluginPath)
        .then(jsonData => {
          resolve(jsonData);
        })
        .catch(err => reject(err));
    });
  }

  getAllBlockData(blockPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(blockPath).then(blockNames => {
        const blockLoader = [];

        blockNames.forEach(blockName => {
          blockLoader.push(this.loadJSONFile(blockPath, blockName));
        });

        Promise.all(blockLoader)
          .then(blockData => {
            resolve(blockData);
          })
          .catch(err => reject(err));
      });
    });
  }

  loadJSONFile(blockPath, name) {
    return new Promise((resolve, reject) => {
      const targetPath = path.join(blockPath, name);

      fs.readJSON(targetPath)
        .then(blockData => {
          resolve({
            ...blockData,
            filePath: targetPath,
          });
        })
        .catch(err => reject(err));
    });
  }

  getAllTemplates(templatePath) {
    return new Promise((resolve, reject) => {
      fs.readdir(templatePath).then(templateNames => {
        const templateLoader = [];

        templateNames.forEach(templateName => {
          templateLoader.push(
            this.loadTemplateFile(templatePath, templateName),
          );
        });

        Promise.all(templateLoader)
          .then(templateData => {
            resolve(templateData);
          })
          .catch(err => reject(err));
      });
    });
  }

  loadTemplateFile(templatePath, fileName) {
    return new Promise((resolve, reject) => {
      const targetPath = path.join(templatePath, fileName);

      fs.readFile(targetPath, (err, data) => {
        if (err) reject(err);

        resolve({
          filePath: targetPath,
          template: data.toString(),
        });
      });
    });
  }

  getAllData(dataPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(dataPath).then(schemaNames => {
        const dataLoader = [];

        schemaNames.forEach(schemaName => {
          dataLoader.push(this.loadJSONFile(dataPath, schemaName));
        });

        Promise.all(dataLoader)
          .then(data => {
            resolve(data);
          })
          .catch(err => reject(err));
      });
    });
  }
};
