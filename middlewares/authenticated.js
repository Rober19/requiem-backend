'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');
const dbUser = require('../model/user');

exports.ensure_Auth = function (req, res, next) {

  //en caso de que no se reciba en la cabecera la autorizacion, pues se retornata un 403
  if (!req.headers.authorization)
    return res.status(403).send(config.resJson(config.resMsg.nonAuthHeader, 403));

  //sino, se recibira el token para decodificarlo
  //aqui recibimos el token y remplazamos las comillas ' o " por espacio vacio ''
  const token = req.headers.authorization.replace(/['"]+/g, '');
  //luego decodificaremos el token, pero para evitar errores, se validara en el try-catch
  try {
    //decodificar    
    var userToken = jwt.decode(token, config.secret_user_token);
    //si la fecha de expiracion del token es menor o igual a la actual pues el token no servirá
    if (userToken.exp <= moment().unix()) {
      //retornaremos como respuesta que el token ha expirado
      return res.status(401).send(config.resJson(config.resMsg.tokenExp))
    }
  } catch (ex) {
    //y si se capta alguna excepcion se retornará
    return res.status(404).send(config.resJson(config.resMsg.tokenInvalid, 404));
  }
  req.user = userToken;

  dbUser.findOne(
    //usamos la estructura del OR de mongoose
    { _id: req.user.sub }
    , (err, data) => {
      if (err) return res.status(500).send(config.resJson(config.resMsg.error, 500));

      if (data != null) {
        next();
      } else {
        return res.status(500).send(config.resJson(`${config.resMsg.userNotFound} : ${config.resMsg.nonAuth}`, 500));
      }

    });


}