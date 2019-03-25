'use strict';
//importar mis configuraciones predeterminadas
const { resMsg, app_port } = require('./config/config');
//importar el app pre-configurado
const app = require('./app');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const dbUser = require('./model/user');

const { green, yellow, cyan } = require('chalk');

io.on('connection', socket => {
  socket.on('message', data => {
    io.emit('message', { message: 'backend' });
  });

  socket.on('imageChange', data => {
    io.emit('message', data);
  });

  socket.on('chaton', data => {
    dbUser.findOne({ _id: data.emitter }, (err, user) => {
      const { _id, image, nick } = user;
      data.eData = {
        id: _id,
        image: image,
        nick: nick,
      };
      io.emit('chaton', data);
    });
  });
});


//abri un server
server.listen(app_port, () => {
  console.log(
    `${cyan(`[${require('./package.json').name}]`)} ${green(
      `[${resMsg.serverOn.toUpperCase(r => r)}]`,
    )} [Port:${yellow(` ${app_port}`)}]`,
  );
});
