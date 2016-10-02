global.Promise = require('bluebird')
global.Promise.onPossiblyUnhandledRejection((e) => { throw e; });

global.Promise.config({
  // Enable warnings.
  warnings:        false,
  // Enable long stack traces.
  longStackTraces: true,
  // Enable cancellation.
  cancellation:    true
});

