'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const vendor = io.connect(`${process.env.HOST}/caps`);

setTimeout(() => {
  let fakeOrder = {
    storeName: process.env.SHOP,
    orderID: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  };
  vendor.emit('CapOrder', fakeOrder);
}, 500 );

vendor.on('VendorDelivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});
