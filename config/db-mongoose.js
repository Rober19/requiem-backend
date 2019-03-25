'use strict';

const { resMsg, dev_crendentials } = require('./config');
//requerir mongoose para mongoDB
const mongoose = require('mongoose');
const dbPaginate = require('mongoose-pagination');
const { green, cyan, red, yellow } = require('chalk');
//hacer un metodo de promesa para hacer conexión
mongoose.Promise = global.Promise;
// conectar con la url de la data base
mongoose.connect(`mongodb://${dev_crendentials.creds.mlab_db}/db-social-mean5`, { useNewUrlParser: true })

mongoose.connection
.on('error', () => {
  console.log(
    `${cyan(`[${require('../package.json').name}]`)} ${red(`[${resMsg.conectionErr}]`)} [Status:${red(` ${400}`)}]`,
  );
  //console.log(err);
})
.on('disconnected', () => {
  console.log(
    `disconnected: ${cyan(`[${require('../package.json').name}]`)} ${red(`[${resMsg.conectionErr}]`)} [Status:${red(` ${400}`)}]`,
  );
})
.once('open', () => {
  const { name /*host, port, user, pass*/ } = mongoose.connections[0];
    //console.log(`Conectado a ${name} [${host}:${port}]`)
    console.log(`${cyan(`[${name}]`)} ${green(`[${resMsg.conectionOk}]`)} [Status:${green(` ${200}`)}]`);
    if (dbPaginate)
      console.log(
        `${cyan(`[${name}]`)} ${green(`[mongoose-pagination] [${resMsg.found}]`)} [Status:${yellow(` Package `)}]`,
      );
});

module.exports = mongoose;
