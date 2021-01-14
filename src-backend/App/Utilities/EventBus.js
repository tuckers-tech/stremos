const { Subject } = require('rxjs');
const { filter } = require('rxjs/operators');
const LoggerBase = require('../Parents/LoggerBase');

module.exports = class EventBus extends LoggerBase {
  constructor(app, logger) {
    super(app, logger, 'EventBus');

    this.events = new Subject();
  }

  emit(channel, payload) {
    this.events.next({
      channel,
      payload,
    });
  }

  watch(targetChannel) {
    if (targetChannel === '*') {
      // Return all events
      return this.events;
    } else {
      // Return only the event I ask for
      return this.events.pipe(filter(event => event.channel === targetChannel));
    }
  }
};
