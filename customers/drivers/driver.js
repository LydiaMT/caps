'use strict';

const events = require('../../events.js');
// ----- MONITOR THE SYSTEM FOR EVENTS-----
// FOR PICKUP EVENT
// ---------------------------------------------
// (1) Wait 1 second
// (a) Log “DRIVER: picked up [ORDER_ID]” to the console.
// (b) Emit an ‘in-transit’ event with the payload you received
events.on('pickup', payload => {
  setTimeout(()=> {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    events.emit('in-transit', payload);
  }, 1000);
});
// ---------------------------------------------
// (2) Wait 3 second
// (a) Log “delivered” to the console
// (b) Emit a ‘delivered’ event with the same payload
events.on('in-transit', payload => {
  setTimeout(() => {
    console.log(payload);
    events.emit('delivered', payload => {
      console.log(`delivered up ${payload.orderID}`);
    });
  }, 3000 );
});
