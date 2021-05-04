'use strict';

require('dotenv').config();
const faker = require('faker');
const events = require('../../events.js');
require('../drivers/driver');

// ----- EVERY 5 SECONDS, SIMULATE A NEW CUSTOMER ORDER -----
// (1) Create a fake order, as an object: storeName, orderId, customerName, address
setTimeout(() => {
  let fakeOrder = {
    storeName: process.env.SHOP,
    orderID: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  };
  // (2) Emit a ‘pickup’ event and attach the fake order as payload
  events.emit('order', fakeOrder);
}, 5000 );

// ----- MONITOR THE SYSTEM FOR EVENTS -----
// (1) Whenever the 'delivered' event occurs, log "Thank You" to the console
events.emit('in-transit', payload => {
  console.log(`Thank you for delivering ${payload.orderID}`);
});
