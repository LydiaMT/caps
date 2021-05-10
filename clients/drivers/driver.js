'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const client = io.connect('http://localhost:3002/hub');

client.emit('getAll', {store:'acme-widgets', event:'newOrder'});
client.emit('getAll', {store:'1-206-flowers', event:'newOrder'});

client.on('order', ({id, payload}) => {
  client.emit('received', {id, payload});
  console.log(`DRIVER: Package #${payload.orderId} is ready for pickup`);

  setTimeout(()=> {
    client.emit('delivered', () => {
      console.log('Your order has been delivered');
    });
  }, 5000);

});
