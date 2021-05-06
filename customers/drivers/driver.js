'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const socket = io.connect(`${process.env.HOST}/caps`);

socket.on('pickup', payload => {
  setTimeout(()=> {
    console.log(`DRIVER: your package #${payload.orderId} is on the way`);
    socket.emit('in-transit', payload);
  }, 5000);

  setTimeout(() => {
    console.log(`DRIVER: delivered package #${payload.orderId}`);
    socket.emit('delivered', payload);
  }, 5000 );

});
