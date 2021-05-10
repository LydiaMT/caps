/* eslint-disable no-prototype-builtins */
'use strict';

require('dotenv').config();
const PORT = process.env.PORT_SERVER || 3005;
const io = require('socket.io')(PORT);
const uuid = require('uuid').v4;

const hub = io.of('/hub'); // namespace

const queue = {};

hub.on('connection', socket => {

  socket.on('join', room => {
    console.log('STORES:', room);
    if(!queue.hasOwnProperty(room)){
      queue[room] = {
        'newOrder': {},
        'received': {}
      };
    }
    socket.join(room);
  });

  socket.on('newOrder', payload => {
    let id = uuid();
    queue[payload.store]['newOrder'][id] = payload;
    console.log('current order queue', queue[payload.store]);
    hub.emit('order', {id, payload});
    // socket.emit('added');
  });

  socket.on('getAll', payload =>{
    console.log('++++++++++++++++++++',payload);
    Object.keys(queue[payload.store][payload.event]).forEach(id => {
      hub.emit('order', {id , payload: queue[payload.store][payload.event][id]} );
    });
  });

  socket.on('received', ({ id, payload }) =>{
    delete queue[payload.store]['newOrder'][id];
    queue[payload.store]['received'][id] = payload;
    console.log('updated queue:', queue[payload.store]);
  });

  socket.on('delivered', () =>{
    console.log('Your order has been delivered');
  });
});
