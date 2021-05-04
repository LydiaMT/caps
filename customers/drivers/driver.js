'use strict';

const events = require('../../events.js');
// ----- MONITOR THE SYSTEM FOR EVENTS-----
// FOR PICKUP EVENT
// ---------------------------------------------
// (1) Wait 1 second
// (a) Log “DRIVER: picked up [ORDER_ID]” to the console.
events.on('pickup', payload => {
  setTimeout(()=> {
    console.log(`DRIVER: picked up ${payload.orderID}`);
  }, 1000);
  events.emit('in-transit', payload);
});
// (b) Emit an ‘in-transit’ event with the payload you received
events.on('in-transit', payload => {
  setTimeout(() => {
    console.log(payload);
  }, 3000 );
  events.emit('delivered', payload);
});
// ---------------------------------------------
// (2) Wait 3 second
// (a) Log “delivered” to the console
// (b) Emit a ‘delivered’ event with the same payload
// events.on('delivered', payload =>{
//   setTimeout(()=> {
//     console.log(`delivered`);
//   }, 3000 );
// });
