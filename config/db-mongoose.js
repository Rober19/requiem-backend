'use strict'

const { resMsg, dev_crendentials } = require('./config')
//requerir mongoose para mongoDB
const mongoose = require('mongoose');
const dbPaginate = require('mongoose-pagination');
const { green, cyan, red, yellow } = require('chalk');
//hacer un metodo de promesa para hacer conexión
mongoose.Promise = global.Promise;
// conectar con la url de la data base
mongoose.connect(`mongodb://${dev_crendentials.creds.mlab_db}/db-social-mean5`).then((d) => {
  //si se conecta correctamente 
const { name, /*host, port, user, pass*/ } = d.connections[0];
  //console.log(`Conectado a ${name} [${host}:${port}]`)
  console.log(`${cyan(`[${name}]`)} ${green(`[${resMsg.conectionOk}]`)} [Status:${green(` ${200}`)}]`)
  if (dbPaginate)console.log(`${cyan(`[${name}]`)} ${green(`[mongoose-pagination] [${resMsg.found}]`)} [Status:${yellow(` Package `)}]`)
},
  (err) => {
    //pero si ocurre un error
    console.log(`${cyan(`[${require('../package.json').name}]`)} ${red(`[${resMsg.conectionErr}]`)} [Status:${red(` ${400}`)}]`)
    console.log(err)
  })

module.exports = mongoose;