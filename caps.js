'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

const caps = io.of('/caps');

// -------------- ORDER --------------
io.on('connection', (socket) => {
  console.log('CONNECTED', socket.id);
});

caps.on('connection', (socket) => {
  socket.on('CapOrder', payload => {
    console.log('EVENT:', {
      event: 'pickup',
      time: new Date(),
      payload: payload
    });
    caps.emit('DriverPickup', payload);
  });

  socket.on('CapInTransit', payload => {
    console.log('EVENT:', {
      event: 'in-transit',
      time: new Date(),
      payload: payload
    });
    caps.emit('DriverInTransit', payload);
  });

  socket.on('CapDelivered', payload => {
    caps.emit('VendorDelivered', payload);
    console.log('EVENT:', {
      event: 'delievered',
      time: new Date(),
      payload: payload
    });
  });

});
