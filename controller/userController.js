'use strict'

const config = require('../config/config');
const Model = require('../model/user');
const bcrypt = require('bcrypt-nodejs');

// validador de la contraseña traida por el res.body
function Passcrypt(password) {
  if (password) {
    return bcrypt.hashSync(password);
  } else {
    return null;
  }
}
//funcion para retornar usuario
function User(req) {
  //usuario previamente creado para generar el usuario que irá a la base de datos
  const user = {
    name: req.body.name,
    surname: req.body.surname,
    nick: req.body.nick,
    email: req.body.email,
    password: Passcrypt(req.body.password),
    image: req.body.image
  }
  return user;
}


function createUser(req, res) {

  //debemos comprobar si el email o el nick existen en la DB
  Model.findOne({
    //usamos la estructura del OR de mongoose
    $or: [{ email: User(req).email }, { nick: User(req).nick }]
  }, (err, data) => {
    //aqui retoranremos errores
    if (err) return res.status(400).send(config.resJson(config.resMsg.RegisterErr, 400));
    //en caso de encontrar alguno de los 2 datos pues retornara un mensaje de existencia comprovada
    if (data != null) {
      return res.status(400).send(config.resJson(config.resMsg.userExist, 400));
    } else {
      //de lo contrario, se tomaran los valores del usuario y se registraran en la DB
      Model.create(User(req), (err, data) => {
        //si ocurre algun erro pues lo retornaremos
        if (err) return res.status(400).send(config.resJson(config.resMsg.RegisterErr, 400));
        //sino retornaremos un mensaje exitoso
        res.status(200).send(config.resJson(config.resMsg.userCreateOK, 200));
      });
    }

  });




}

module.exports = {
  createUser
}
