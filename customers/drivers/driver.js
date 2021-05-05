'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const driver = io.connect(`${process.env.HOST}/caps`);

driver.on('DriverPickup', payload => {
  setTimeout(()=> {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    driver.emit('CapInTransit', payload);
  }, 1500);
});

driver.on('DriverInTransit', payload => {
  setTimeout(() => {
    console.log(`DRIVER: delivered up ${payload.orderID}`);
    driver.emit('CapDelivered', payload);
  }, 3000 );
});
