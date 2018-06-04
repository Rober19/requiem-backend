'use strict'

const config = require('./config')
//requerir mongoose para mongoDB
const mongoose = require('mongoose');

//hacer un metodo de promesa para hacer conexión
mongoose.Promise = global.Promise;
// conectar con la url de la data base
mongoose.connect(`mongodb://${config.dev_crendentials.mlab_db}/db-social-mean5`).then( () => {
  //si se conecta correctamente
  console.log(config.resJson(config.resMsg.conectionOk, 200))
}).catch( (err) => {
  //pero si ocurre un error
  console.log(config.resJson(config.resMsg.conectionErr, 400))
});

module.exports = mongoose;