'use strict'
//importar mis configuraciones predeterminadas
const config = require('./config/config');
//importar el app pre-configurado
const app = require('./app');
//importar la conexion a mongoose pre-configurada
const mongoose = require('./config/db-mongoose');

//abri un server
app.listen(3000, () => {
  console.log(config.resJson(config.resMsg.serverOn, 200))
});



