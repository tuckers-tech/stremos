const Controller = require('../Parents/Controller');
const fs = require('fs-extra');
const path = require('path');

module.exports = class JSONController extends Controller {
  constructor(app, logger, parentClassName, jsonOptions) {
    super(app, logger, `${parentClassName} -> JSONController`);

    this.jsonOptions = jsonOptions;

    this.value = {};
    this.hasLoaded = false;

    this.jsonFileLocation = path.join(
      jsonOptions.location,
      jsonOptions.fileName,
    );

    this.ensureFileExists(this.jsonFileLocation);

    this.loadInitialFileContents();
  }

  ensureFileExists() {
    this.logInfo(`Searching for file at: ${this.jsonFileLocation}`);

    try {
      fs.statSync(this.jsonFileLocation);
      this.logSuccess('Found file!');
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Doesn't Exist
        this.logWarn('Unable to find file. Trying to create it.');
        this.createFileWithDefaults(this.jsonFileLocation);
      }
    }
  }

  createFileWithDefaults() {
    this.logInfo(`Creating file: ${this.jsonFileLocation} with default value`);
    fs.outputJSONSync(this.jsonFileLocation, this.jsonOptions.defaultValue);
  }

  loadInitialFileContents() {
    fs.readFile(this.jsonFileLocation)
      .then(fileData => {
        this.value = JSON.parse(fileData.toString());
      })
      .catch(err => this.logError(err));
  }

  addElementToArray(targetArr, element) {
    return new Promise((resolve, reject) => {
      this.value[targetArr].push(element);
      this.writeDataToFile()
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }

  writeDataToFile() {
    return new Promise((resolve, reject) => {
      fs.outputJSON(this.jsonFileLocation, this.value, {
        encoding: 'utf-8',
      })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  destroy() {}
};
