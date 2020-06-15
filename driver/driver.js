'use strict';

const net = require('net');
const client = new net.Socket();


const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, ()=> {console.log('driver got connected');});
let end ;
let end1;
client.on('data', function(data) {
 
  let event = JSON.parse(data);
  
  if (event.event === 'pic-up'){
    end = setTimeout(function(){
      console.log(`picked up ${event.payload.orderId}`);
      let nowEvent = JSON.stringify({ event: 'in-transit',time:new Date(), payload: event.payload });
      client.write(nowEvent);
    }, 1000);
            
    end1 =setTimeout(function(){
      console.log(`delivered ${event.payload.orderId}`);
      let nowEvent1 = JSON.stringify({ event: 'delivered',time:new Date(), payload: event.payload });
      client.write(nowEvent1);
       
    }, 3000);
  }
     
 
});

client.on('close', function() {
  console.log('driver Connection got closed');
  clearTimeout(end);
  clearTimeout(end1);
});




// 'use strict';
// const events = require('./events');
// function timing(paylod){
  
//   setTimeout(function(){

//     console.log(`DRIVER: picked up ${paylod.orderId}`);
//     events.emit('in-transit',paylod);
//   }, 1000);
    
//   setTimeout(function(){
//     console.log('delivered');
//     events.emit('delivered',paylod);
//     console.log('WELCOME!!!!');
//   }, 3000);
    
// }

// module.exports = timing;