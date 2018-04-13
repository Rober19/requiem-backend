'use strict'
//importar mis configuraciones predeterminadas
const config = require('./config/config');
//importar el app pre-configurado
const app = require('./app');
//importar la conexion a mongoose pre-configurada
const mongoose = require('./config/db-mongoose');
const server = require('http').Server(app);
const io = require('socket.io')(server);
let i = 0;
io.on('connection', socket => {
    
  socket.on('message', data => {
    i += 1;
    console.log(i,data);
    io.emit('message', { message: i+'backend' });
  });

});

//abri un server
server.listen(config.port, () => {
  console.log(config.resJson((config.resMsg.serverOn + ' on ' + config.port), 200))
});



