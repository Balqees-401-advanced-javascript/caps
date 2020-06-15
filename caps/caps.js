'use strict';

const net = require('net');
const uuid = require('uuid-random');
const PORT = process.env.PORT || 3000;

const server = net.createServer(); 
server.listen(PORT, ()=> console.log(`Server is up on ${PORT}`));

let socketPool = {};

server.on('connection', (socket)=> {
  const id = `Socket-${uuid()}`;
  console.log(`client with ID : ${id} is connected!!! `);
  socketPool[id] = socket;
  socket.on('data', (buffer)=> dispatchEvent(buffer));
    
  socket.on('error', (e) => {console.log('SOCKET ERR', e);});

  socket.on('end', (end) => {
    console.log('connection ended', end);
    delete socketPool[id];
  });
});

server.on('error', (e)=> {
  console.log('SERVER ERROR', e);
});



function dispatchEvent(buffer) {
  let message = JSON.parse(buffer.toString().trim());
  console.log('Event',message);
  broadcast(message);
}

function broadcast(msg) {
  
  let payload = JSON.stringify(msg);
  // if (msg.event !== 'in-transit'){
  //   console.log('-3-3--3-3-----3-3--######################################');
  for (let socket in socketPool) {
    socketPool[socket].write(payload);
    // }
  }
}





// 'use strict';
// const events = require('./src/events');
// const driver = require('./src/driver');

// events.on('pickup', payload => userEvent('pickup', payload));
// events.on('in-transit', payload => logIt('in-transit', payload));
// events.on('delivered', payload => logIt('delivered', payload));

// function logIt(event, payload) {
//   let time = new Date();
//   console.log({event, time, payload});
// }

// function userEvent(event,payload) {
//   logIt(event , payload );
//   driver(payload);
// }