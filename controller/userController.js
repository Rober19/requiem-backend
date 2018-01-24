'use strict'

const config = require('../config/config');
const Model = require('../model/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

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

// ESTO ESTA OBSOLETO HASTA EL MOMENTO
function findUser(filter) {

  console.log(filter);
  Model.findOne(filter, (err, data) => {
    if (err) return err;
    if (data != null) {
      
    } else {
      
    }    
  });  
  
}


function createUser(req, res) {
  //debemos comprobar si el email o el nick existen en la DB
  Model.findOne({
    //usamos la estructura del OR de mongoose
    $or: [{ email: User(req).email }, { nick: User(req).nick }]
  }, (err, data) => {
    //aqui retoranremos errores
    if (err) return res.status(500).send(config.resJson(config.resMsg.RegisterErr, 500));
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

function loginUser(req, res) {
// antes de hacer el login buscaremos si el email registrado existe
  Model.findOne({ email: User(req).email }, (err, data) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.error, 500));
    if (data != null) {
    // si existe pues procederemos a comprobar la contraseña registrada

    //con esta const podremos ver si la contraseña es correcta o no
    const validateLog = bcrypt.compareSync(req.body.password, data.password);  
      if (validateLog) {
        //en caso de que sea correcta se haran los procesoces de logueo y de cifrado tokens
        if(req.body.tokenget){          
          return res.status(200).send(config.resJson(jwt.createToken(data), 200));
        } else {
          data.password = undefined;
          return res.status(200).send(config.resJson(data, 200));
        }
        

      } else {
        //pero en caso de que no simplemente retornaremos que la contraseña es incorrecta
        return res.status(404).send(config.resJson(config.resMsg.PasswordErr, 404));
      }
    } else {
      // sino pues evitaremos la comprobacion del resto de datos
      return res.status(404).send(config.resJson(config.resMsg.userNotFound, 404));
    }    
  });  




}


module.exports = {
  createUser,
  loginUser
}
