'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const socket = io.connect(`${process.env.HOST}/caps`);

const store = process.env.SHOP;
socket.emit('join', store);

setInterval(() => {
  let fakeOrder = {
    store: store,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  };
  socket.emit('pickup', fakeOrder);
}, 5000 );

socket.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
});
