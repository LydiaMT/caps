'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

const caps = io.of('/caps');

// -------------- ORDER --------------
io.on('connection', socket => {
  console.log('CONNECTED! User namespace:', socket.id);
});

caps.on('connection', socket => {

  socket.on('join', room => {
    console.log('room name:', room);
    socket.join(room);
  });

  socket.on('pickup', payload => {
    console.log('EVENT:', {
      event: 'pickup',
      time: new Date(),
      payload: payload
    });
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    console.log('EVENT:', {
      event: 'in-transit',
      time: new Date(),
      payload: payload
    });
    caps.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', payload => {
    console.log('EVENT:', {
      event: 'delievered',
      time: new Date(),
      payload: payload
    });
    caps.to(payload.store).emit('delivered', payload);
  });

});
