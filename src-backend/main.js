const { app } = require('electron');

const App = require('./App/App');

let isDevEnv = false;
let verbose = false;

if (process.argv.includes('--dev')) {
  isDevEnv = true;
}

if (process.argv.includes('--verbose')) {
  verbose = true;
}

let options = {
  isDevEnv,
  verbose,
};

/**
 * Immediately bootstrap App to App Class
 */
function startApp() {
  const application = new App(app, options);
  application.start();
}

app.whenReady().then(startApp);
