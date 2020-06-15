'use strict';
require('dotenv').config();
var faker = require('faker');
const events = require('./events');

setInterval(function(){

  let user = {
    randomName: faker.name.findName(),
    orderId:faker.random.uuid(),
    addres:faker.address.city(),
    storeName:process.env.STORENAME,
  };

  events.emit('pickup', user );
}, 5000);


    