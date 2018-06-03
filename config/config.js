'use strict'
//puerto predeterminado
const myConfig = require('rober19-config')

const port = process.env.PORT || 3000;

let x = 0;

const resMsg = myConfig.resMsg;

//contraseñas para los tokens
const admin_secret = 'givemethetoken';
const secret_name_image = 'packet';
const secret_user_token = 'secret_token_summertime_sadness';

const ip_fetch = {    
  ip_defaul_user_image: 'https://firebasestorage.googleapis.com/v0/b/rober-firebase.appspot.com/o/Requiem-project%2FProfile-image%2Fdefault-user.png?alt=media&token=ba901b72-bbc0-44de-a897-cda79e6552a5'
}

//funcion que responde los parametros
function resJson(msg, status) {
  const answer = { data: msg, status: status}
  return answer;
}
//funcion de prueba
function resTest(res) {
  res.status(200).send(resJson(resMsg.confirm, 200));
}


module.exports = {
  port,
  resMsg,
  resJson,
  resTest,
  secret_name_image,
  secret_user_token,
  admin_secret,
  ip_fetch
}