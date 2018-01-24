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


  Model.findOne({
    $or: [{ email: User(req).email }, { nick: User(req).nick }]
  }, (err, data) => {
    if (err) return res.status(400).send(config.resJson(config.resMsg.RegisterErr, 400)); 
   
    if (data != null) {
      return res.status(400).send(config.resJson(config.resMsg.userExist, 400));
    } else {
        Model.create(User(req), (err, data) => {
        if (err) return res.status(400).send(config.resJson(config.resMsg.RegisterErr, 400));
        res.status(200).send(config.resJson(config.resMsg.userCreateOK, 200));
      });
    }

  });




}

module.exports = {
  createUser
}
