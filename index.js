'use strict'
//importar mis configuraciones predeterminadas
const { resMsg, port } = require('./config/config');
//importar el app pre-configurado
const app = require('./app');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const dbUser = require('./model/user');

const { green, yellow, cyan } = require('chalk');

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.emit('message', { message: 'backend' });
  });

  socket.on('imageChange', (data) => {
    io.emit('message', (data));
  });

  socket.on('chaton', (data) => {
    dbUser.findOne({ _id: data.emitter }, (err, user) => {
      const { _id, image, nick } = user;
      data.eData = {
        id: _id,
        image: image,
        nick: nick
      }
      io.emit('chaton', data);
    })

  })

});

// setInterval(() => {

//   fetch('https://backend-mean5-project.herokuapp.com/app/get')
//     .then((response) => {
//       return response.json();
//     })
//     .then((myJson) => {
//       console.log(myJson);
//     });

//   fetch('https://frontend-mean5-project.herokuapp.com')
//     .then(() => {
//       console.log('entró');
//     })

// }, 300000)

//abri un server
server.listen(port, () => {
  console.log(`${cyan(`[${require('./package.json').name}]`)} ${green(`[${resMsg.serverOn.toUpperCase(r => r)}]`)} [Port:${yellow(` ${port}`)}]`)
});



