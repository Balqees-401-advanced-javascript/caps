'use strict';
const events = require('./src/events');
const driver = require('./src/driver');

events.on('pickup', payload => userEvent('pickup', payload));
events.on('in-transit', payload => logIt('in-transit', payload));
events.on('delivered', payload => logIt('delivered', payload));

function logIt(event, payload) {
  let time = new Date();
  console.log({event, time, payload});
}

function userEvent(event,payload) {
  logIt(event , payload );
  driver(payload);
}