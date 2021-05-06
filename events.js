'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const faker = require('faker');
const io = require('socket.io-client');
const HOST = process.env.HOST || 'http://localhost:3000';
const PORT2 = process.env.PORT2 || 3001;
const socket = io.connect(`${HOST}/caps`);
// const io = require('socket.io')(PORT2);

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

app.listen(PORT2, () =>{
  console.log(`API server is up on ${PORT2}`);
});
