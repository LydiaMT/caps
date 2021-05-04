'use strict';

const events = require('./events.js');
require('./customers/drivers/driver');
require('./customers/vendors/vendor');

// -------------- ORDER --------------
// 1. EVENT: 'pickup'
// 2. DRIVER: 'pick up zzzzzzzzz'
// 3. EVENT: 'in-transit'
// 4. DRIVER: 'delievered up zzzzzzzzz'
// 5. VENDOR: Thank you
// 6. EVENT: 'delievered'

// ----- READY FOR PICKUP -----
events.on('CapOrder', payload => {
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date(),
    payload: payload
  });
  events.emit('DriverPickup', payload);
});
// ----- IN TRANSIT -----
events.on('CapInTransit', payload => {
  console.log('EVENT:', {
    event: 'in-transit',
    time: new Date(),
    payload: payload
  });
  events.emit('DriverInTransit', payload);
});
// ----- DELIVERED -----
events.on('CapDelivered', payload => {
  console.log('EVENT:', {
    event: 'delievered',
    time: new Date(),
    payload: payload
  });
});
