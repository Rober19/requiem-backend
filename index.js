'use strict'
//importar mis configuraciones predeterminadas
const config = require('./config/config');
//importar el app pre-configurado
const app = require('./app');
//importar la conexion a mongoose pre-configurada
const mongoose = require('./config/db-mongoose');
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', socket => {

  socket.on('myNotification', data => {

    if (data.option == 'like') {
      io.emit('myNotification', data)
      console.log(data)
    }


  });

});

//abri un server
server.listen(config.port, () => {
  console.log(config.resJson((config.resMsg.serverOn + ' on ' + config.port), 200))
});



