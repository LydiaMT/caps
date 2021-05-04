'use strict';
// Manages the state of every package
// Logs every event to the console with a timestamp and the event payload
const events = require('./events.js');
require('./customers/drivers/driver');
require('./customers/vendors/vendor');
// ----- READY FOR PICKUP -----
events.on('order', payload => {
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date,
    payload: payload
  });
  events.emit('pickup', payload);
});
// ----- IN TRANSIT -----
events.on('in-transit', payload => {
  console.log('EVENT:', {
    event: 'in-transit',
    time: new Date,
    payload: payload
  });
});
// ----- DELIVERED -----
events.on('delivered', payload => {
  console.log('EVENT:', {
    event: 'delievered',
    time: new Date,
    payload: payload
  });
});
