'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const faker = require('faker');
const io = require('socket.io-client');
const HOST = process.env.HOST || 'http://localhost:3000';
const PORT = process.env.PORT_CLIENT || 3004;
const socket = io.connect(`${HOST}/caps`);
// const io = require('socket.io')(PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/pickup', (req, res) => {
  let fakeOrder = req.body || {
    store: process.env.SHOP || '1-800-flowerz',
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  };
  socket.emit('pickup', fakeOrder);
  res.status(200).send('Your package was scheduled');
});

app.listen(PORT, () =>{
  console.log(`API server is up on ${PORT}`);
});
