'use strict';
require('dotenv').config();
var faker = require('faker');
const net = require('net');

const client = new net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, ()=> {console.log('#####vendor got connected####');});



client.on('data', function(data){ 
  // when the server sends me back any data
  let eventObj = JSON.parse(data);
  if (eventObj.event === 'delivered') {
    console.log('Thank you!!');
  }
});


function sendMessage(user) {
  let event = JSON.stringify({ event: 'pic-up',time:new Date(), payload: user });
  client.write(event);
}
  
  


let end = setInterval (function getData() {
  let user = {
    randomName: faker.name.findName(),
    orderId:faker.random.uuid(),
    addres:faker.address.city(),
    storeName:process.env.STORENAME || 'mod',
  };
    
  sendMessage(user);
}, 5000);
  
 
client.on('close', function() {
  console.log('driver Connection got closed');
  clearInterval(end);
});




// 'use strict';
// require('dotenv').config();
// var faker = require('faker');
// const events = require('./events');

// setInterval(function(){

//   let user = {
//     randomName: faker.name.findName(),
//     orderId:faker.random.uuid(),
//     addres:faker.address.city(),
//     storeName:process.env.STORENAME,
//   };

//   events.emit('pickup', user );
// }, 5000);


    