const { BehaviorSubject } = require('rxjs');
const Controller = require('../Parents/Controller');

module.exports = class StateController extends Controller {
  constructor(app, logger, eventBus) {
    super(app, logger, 'StateController\t');
    this.state = new BehaviorSubject('null');
    this.eventBus = eventBus;
    this.state.subscribe(newState => {
      console.log('new app state');
      this.eventBus.emit('app-state', newState);
    });
  }

  goToState(targetState) {
    this.state.next(targetState);
    this.logApplicationState(targetState);
  }

  logApplicationState(newState) {
    this.logInfo('==========================================');
    this.logInfo(`\tApplication State Change: ${newState}`);
    this.logInfo('==========================================');
  }
};
