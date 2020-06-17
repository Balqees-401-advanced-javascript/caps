
'use strict';

const socketIo = require('socket.io')(3000);

socketIo.on('connection', (socket) =>{
  console.log('CORE', socket.id);
});

const caps = socketIo.of('/caps');
caps.on('connection', (socket) =>{
  console.log('connectied', socket.id);
  socket.on('join', room => {
    console.log('joined room', room);
    socket.join(room);
  });


  socket.on('pickup',data => {
    console.log('pickup',data);
    caps.emit('pickup' ,data);
  });

  socket.on('in-transit',data => {
    console.log('in-transit',data);
    caps.to(data).emit('in-transit' ,data);
  });

  socket.on('delivered',data => {
    console.log('delivered',data);
    caps.to(data).emit('delivered' ,data);
  });
});