const JSONController = require('../Data/JSONController');

const { take } = require('rxjs/operators');

module.exports = class ProjectFileController extends JSONController {
  constructor(app, logger, jsonOptions) {
    super(app, logger, 'ProjectFileController', jsonOptions);
  }

  getProjectData() {
    return new Promise((resolve, reject) => {
      if (this.hasLoaded) {
        resolve(this.value);
      } else {
        if (!this.isLoading.value) {
          reject(
            'ProjectFileController Not Initialized yet.  Run `new ProjectFileController()` before `getProjectData()`',
          );
        } else {
          // Project load has started, but is not finished
          this.isLoading.pipe(take(2)).subscribe(isLoadingStatus => {
            if (!isLoadingStatus) {
              resolve(this.value);
            }
          });
        }
      }
    });
  }
};
