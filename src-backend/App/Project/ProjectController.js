const Controller = require('../Parents/Controller');
const fs = require('fs-extra');
const path = require('path');
const ProjectFileController = require('./ProjectFileController');
const { generateDefaultProjectJSON } = require('./defaults/defaultProject');
const { sanitizeProjectName } = require('../Utilities/sanitizeProjectName');
module.exports = class ProjectController extends Controller {
  constructor(app, logger) {
    super(app, logger, 'Project Controller');

    this.isProjectLoaded = false;
    this.projectFileController = null;
    this.projectLocation = null;
  }

  createProjectFiles(projectData) {
    return new Promise((resolve, reject) => {
      this.logInfo('Creating Project Files');
      this.logInfo(JSON.stringify(projectData, undefined, 4));

      let sanitizedProjectName = sanitizeProjectName(projectData.projectName);

      let targetParentDir = path.join(
        projectData.projectLocation,
        sanitizedProjectName,
      );

      this.ensureParentProjectControllerExists(targetParentDir)
        .then(() => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  ensureParentProjectControllerExists(targetPath) {
    return new Promise((resolve, reject) => {
      fs.stat(targetPath)
        .then(() => {
          resolve();
        })
        .catch(err => {
          if (err.code === 'ENOENT') {
            try {
              fs.mkdirSync(targetPath, { recursive: true });
              resolve();
            } catch (error) {
              reject(error);
            }
          }
        });
    });
  }

  getProjectData() {}

  setProjectData() {}

  loadProject(projectFileLocation, projectOptions) {
    this.projectLocation = projectFileLocation;
    this.projectFileController = new ProjectFileController(
      this.app,
      this.logger,
      {
        location: projectFileLocation,
        fileName: 'stremos.project',
        defaultValue: generateDefaultProjectJSON(projectOptions),
      },
    );
  }

  unloadProject() {
    this.projectLocation = null;
    this.projectFileController = null;
  }
};
