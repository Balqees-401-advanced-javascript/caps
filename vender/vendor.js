
'use strict';

const faker = require('faker');
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');
const store = 'moda';
caps.emit('join', store);

caps.on('done',data =>{
  console.log('Thank you!!',data.payload.orderID);
});

setInterval(() => {
  let data = {
    storeName: store,
    customerName: faker.name.findName(),
    orderID: faker.random.uuid(),
    address: faker.address.streetAddress(),
  };
  let event = { event: 'pickup', time: new Date(), payload: data };
  caps.emit('pickup', event);
}, 5000);
