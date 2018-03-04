'use strict'
//requerimos path para la direcciones de carpeta - creo
const path = require('path');
// la depn fs (fileSystem) para la gestion de archivos y carpetas
const fs = require('fs');
// config pues para las preferencias predeterminadas
const config = require('../config/config');
// Paginate para la paginacion de datos provenientes de la DB
const mongoosePaginate = require('mongoose-pagination');
// el modelos de follow
const dbFollow = require('../model/follow');
//el modelo del usuaruo
const dbUser = require('../model/user');


//este es el esquema que usaremos del modelo follows
function Follow(req) {
  const dbFollow = {
    user: req.user.sub,
    followed: req.body.followed
  }

  return dbFollow;
}
// esta el la funcion que guarda el follow en da DB
function createFollow(req, res) {

  //esta sentencia sera para impedir que un usuario se siga a si mismo
  if (Follow(req).user == Follow(req).followed) return res.status(500).send(config.resJson(config.resMsg.userFollowNotSelf, 500));

  dbFollow.findOne({
    //usamos la estructura del OR de mongoose
    $and: [{ user: Follow(req).user }, { followed: Follow(req).followed }]
  }, (err, data) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.userFollowedErr, 500));
    if (data == null) {
      //se tomaran los valores del usuario y se registrara el follow en la DB
      dbFollow.create(Follow(req), (err, data) => {
        //si ocurre algun error pues lo retornaremos
        if (err) return res.status(400).send(config.resJson(config.resMsg.userFollowedErr, 200));
        //sino retornaremos un mensaje exitoso
        res.status(200).send(config.resJson(config.resMsg.userFollowedOK, 200));
      });
    } else {
      res.status(200).send(config.resJson(config.resMsg.userFollowedExist, 200));
    }
  });
}
// esta el la funcion que elimina el follow en da DB
function deleteFollow(req, res) {

  dbFollow.findOne({
    //usamos la estructura del OR de mongoose - si encuntra que coincida justo con la sentencia pues -->
    $and: [{ user: Follow(req).user }, { followed: Follow(req).followed }]
  }, (err, data) => {

    if (err) return res.status(500).send(config.resJson(config.resMsg.userUnfollowedErr, 500));

    if (data == null) {
      if (!req.body.followed) return res.status(500).send(config.resJson(config.resMsg.userNotFound, 500));
      res.status(200).send(config.resJson(config.resMsg.userNotFollowed, 200));
    } else {
      //se tomaran los valores del usuario y se eliminara el follow en la DB
      dbFollow.remove(Follow(req), (err, data) => {
        //si ocurre algun error pues lo retornaremos
        if (err) return res.status(400).send(config.resJson(config.resMsg.userUnfollowedErr, 400));
        //sino retornaremos un mensaje exitoso
        res.status(200).send(config.resJson(config.resMsg.userUnfollowedOK, 200));
      });

    }
  });

}
//esta es la funcion que indica los usuarios que estoy siguiendo
function getFollowingUsers(req, res) {
  // aqui estara el params.id 
  const user_id = req.params.id;
  // la pagina inicial y por defecto será la 1
  let Page = 1;
  // si existe una pagina enviada por query pues se cambiará el valor de Page
  if (req.query.page) {
    Page = req.query.page;
  }
  //se mostraran 4 items por pagina
  let itemsPerPage = 4;
  // buscaremos el usuario y mostraremos sus seguidores
  dbFollow.find({ user: user_id }).populate({ path: 'followed' }).paginate(Page, itemsPerPage, (err, users, total) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.requestErr, 500));

    if (!users) return res.status(404).send(config.resJson(config.resMsg.notUsers, 404));

    return res.status(200).send({
      //los datos encontrados
      users,
      //la cantidad de datos hallados
      total,
      //dividimos el total de datos entre los items por pagina) --aproximamos
      pages: Math.ceil(total / itemsPerPage)
    })
  });

}

function getFollowersUsers(req, res) {
  const user_id = req.params.id;

  let Page = 1;

  if (req.query.page) {
    Page = req.query.page;
  }

  let itemsPerPage = 4;

  dbFollow.find({ followed: user_id }).populate({ path: 'user' }).paginate(Page, itemsPerPage, (err, users, total) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.requestErr, 500));

    if (!users) return res.status(404).send(config.resJson(config.resMsg.notUsers, 404));

    return res.status(200).send({
      users,
      total,
      pages: Math.ceil(total / itemsPerPage)
    })
  });

}

function uploadImage(req, res) {

  const user_id = req.user.sub;
  let image_name = req.file_name;

  const img_user = image_name.split('\--');
  const heroku_backend = 'https://backend-mean5-project.herokuapp.com/app/get-image-user/'

  const path_file = './uploads/users/' + image_name;

  image_name = `publication--${img_user[0]}${img_user[2]}`;
  fs.renameSync(path_file, `./uploads/users/${image_name}`);


  dbUser.findByIdAndUpdate({ _id: user_id }, { image: `${heroku_backend}${image_name}` }, { new: true }, (err, data) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.error, 500));

    if (data != null) {
      //este es el id del usuario descifrado de la imagen
      const img_id_user = jwt.decode(img_user[0], config.secret_name_image);

      //para que no aparezca el hash de la contraseña
      data.password = undefined;
      return res.status(200).send(config.resJson(data, 200));

    } else {
      return res.status(500).send(config.resJson(config.resMsg.userNotFound, 500));
    }



  });
}


module.exports = {
  createFollow,
  deleteFollow,
  getFollowingUsers,
  getFollowersUsers
}