'use strict';

const events = require('../../events.js');
// ----- MONITOR THE SYSTEM FOR EVENTS-----
// FOR PICKUP EVENT
// (1) Wait 1 second, (a) Log “DRIVER: picked up [ORDER_ID]” to the console, (b) Emit an ‘in-transit’ event with the payload you received
events.on('DriverPickup', payload => {
  setTimeout(()=> {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    events.emit('CapInTransit', payload);
  }, 1000);
});
// ---------------------------------------------
// (2) Wait 3 second, (a) Log “delivered” to the console, (b) Emit a ‘delivered’ event with the same payload
events.on('DriverInTransit', payload => {
  setTimeout(() => {
    // console.log(payload);
    console.log(`DRIVER: delivered up ${payload.orderID}`);
    events.emit('VendorDelivered', payload);
  }, 3000 );
});
