'use strict'

const config = require('./config')
//requerir mongoose para mongoDB
const mongoose = require('mongoose');
const { green, yellow, cyan, red } = require('chalk');
//hacer un metodo de promesa para hacer conexión
mongoose.Promise = global.Promise;
// conectar con la url de la data base
mongoose.connect(`mongodb://${config.dev_crendentials.mlab_db}/db-social-mean5`).then((d) => {
  //si se conecta correctamente 
  const { name, host, port, user, pass } = d.connections[0];
  //console.log(`Conectado a ${name} [${host}:${port}]`)
  console.log(`${cyan(`[${name}]`)} ${green(`[${config.resMsg.conectionOk}]`)} [Status:${green(` ${200}`)}]`)
},
  (err) => {
    //pero si ocurre un error
    console.log(`${cyan(`[${require('../package.json').name}]`)} ${red(`[${config.resMsg.conectionErr}]`)} [Status:${red(` ${400}`)}]`)
  })

module.exports = mongoose;