'use strict';
const events = require('./events');
function timing(paylod){
  
  setTimeout(function(){

    console.log(`DRIVER: picked up ${paylod.orderId}`);
    events.emit('in-transit',paylod);
  }, 1000);
    
  setTimeout(function(){
    console.log('delivered');
    events.emit('delivered',paylod);
    console.log('WELCOME!!!!');
  }, 3000);
    
}

module.exports = timing;