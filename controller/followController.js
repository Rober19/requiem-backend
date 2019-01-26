'use strict'

// config pues para las preferencias predeterminadas
const { resMsg, resJson, } = require('../config/config');
// el modelos de follow
const dbFollow = require('../model/follow');

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
  if (Follow(req).user == Follow(req).followed) return res.status(500).send(resJson(resMsg.userFollowNotSelf, 500));

  dbFollow.findOne({
    //usamos la estructura del OR de mongoose
    $and: [{ user: Follow(req).user }, { followed: Follow(req).followed }]
  }, (err, data) => {
    if (err) return res.status(500).send(resJson(resMsg.userFollowedErr, 500));
    if (data == null) {
      //se tomaran los valores del usuario y se registrara el follow en la DB
      dbFollow.create(Follow(req), (err/*, data*/) => {
        //si ocurre algun error pues lo retornaremos
        if (err) return res.status(400).send(resJson(resMsg.userFollowedErr, 200));
        //sino retornaremos un mensaje exitoso
        res.status(200).send(resJson(resMsg.userFollowedOK, 200));
      });
    } else {
      res.status(200).send(resJson(resMsg.userFollowedExist, 200));
    }
  });

}

// función para saber si un usuario es seguidor del usuario en sesión
function isFollow(req, res) {

  dbFollow.findOne({
    //usamos la estructura del OR de mongoose - si encuntra que coincida justo con la sentencia pues -->
    $and: [{ user: Follow(req).user }, { followed: req.params.id }]
  }, (err, data) => {

    if (err) return res.status(500).send(resJson(resMsg.userUnfollowedErr, 500));

    if (data == null) {
      if (!req.body.followed) return res.status(500).send(resJson(resMsg.userNotFound, 500));
      res.status(200).send(resJson(resMsg.userNotFollowed, 200));
    } else {
      res.status(200).send(data);
    }
  });

}

// esta el la funcion que elimina el follow en da DB
function deleteFollow(req, res) {

  dbFollow.findOne({
    //usamos la estructura del OR de mongoose - si encuntra que coincida justo con la sentencia pues -->
    $and: [{ user: Follow(req).user }, { followed: Follow(req).followed }]
  }, (err, data) => {

    if (err) return res.status(500).send(resJson(resMsg.userUnfollowedErr, 500));

    if (data == null) {
      if (!req.body.followed) return res.status(500).send(resJson(resMsg.userNotFound, 500));
      res.status(200).send(resJson(resMsg.userNotFollowed, 200));
    } else {
      //se tomaran los valores del usuario y se eliminara el follow en la DB
      dbFollow.remove(Follow(req), (err/*, data*/) => {
        //si ocurre algun error pues lo retornaremos
        if (err) return res.status(400).send(resJson(resMsg.userUnfollowedErr, 400));
        //sino retornaremos un mensaje exitoso
        res.status(200).send(resJson(resMsg.userUnfollowedOK, 200));
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
  let itemsPerPage = 10;
  // buscaremos el usuario y mostraremos sus seguidores
  dbFollow.find({ user: user_id }).populate({ path: 'followed' }).paginate(Page, itemsPerPage, (err, users, total) => {
    if (err) return res.status(500).send(resJson(resMsg.requestErr, 500));

    if (!users) return res.status(404).send(resJson(resMsg.notUsers, 404));

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
    if (err) return res.status(500).send(resJson(resMsg.requestErr, 500));

    if (!users) return res.status(404).send(resJson(resMsg.notUsers, 404));

    return res.status(200).send({
      users,
      total,
      pages: Math.ceil(total / itemsPerPage)
    })
  });

}

module.exports = {
  createFollow,
  deleteFollow,
  getFollowingUsers,
  getFollowersUsers,
  isFollow
}