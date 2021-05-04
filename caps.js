'use strict';
// Manages the state of every package
// Logs every event to the console with a timestamp and the event payload
const events = require('./events.js');
require('./customers/drivers/driver');
require('./customers/vendors/vendor');
// ----- READY FOR PICKUP -----
// timestamp
// payload
events.on('order', payload => {
  console.log('Event:', {
    event: 'pickup',
    time: new Date,
    payload: payload
  });
  events.emit('pickup', payload);
});
// ----- IN TRANSIT -----
// timestamp
// payload
events.on('in-transit', payload => {
  console.log('Event:', {
    event: 'in-transit',
    time: new Date,
    payload: payload
  });
});
// ----- DELIVERED -----
// timestamp
// payload
events.on('delivered', payload => {
  console.log('Event:', {
    event: 'in-transit',
    time: new Date,
    payload: payload
  });
});
