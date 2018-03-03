'use strict'

const path = require('path');
const fs = require('fs');
const config = require('../config/config');
const mongoosePaginate = require('mongoose-pagination');
const dbFollow = require('../model/follow');
const dbUser = require('../model/user');

function test(req, res) {
  config.resTest(res);
}

function Follow(req) {
  const dbFollow = {
    user: req.user.sub,
    followed: req.body.followed
  }

  return dbFollow;
}

function createFollow(req, res) {

  // if (Follow(req).user == Follow(req).followed) return res.status(500).send(config.resJson(config.resMsg.userFollowNotSelf, 500));

  // dbUser.findOne(
    
  //   { _id: Follow(req).followed }
  // , (err, data) => {
  //   //aqui retoranremos errores
  //   if (err) return res.status(500).send(config.resJson(config.resMsg.userFollowedErr, 500));
  //   //en caso de encontrar alguno de los 2 datos pues retornara un mensaje de existencia comprobada
  //   if (data != null) {

      dbFollow.findOne({
        //usamos la estructura del OR de mongoose
        $and: [{ user: Follow(req).user }, { followed: Follow(req).followed }]
      }, (err, data) => {
        if (err) return res.status(500).send(config.resJson(config.resMsg.userFollowedErr, 500));
        if (data == null) {
          //se tomaran los valores del usuario y se registrara el follow en la DB
          dbFollow.create(Follow(req), (err, data) => {
            //si ocurre algun error pues lo retornaremos
            if (err) return res.status(400).send(config.resJson(config.resMsg.userFollowedErr, 400));
            //sino retornaremos un mensaje exitoso
            res.status(200).send(config.resJson(config.resMsg.userFollowedOK, 200));
          });
        } else {
          res.status(200).send(config.resJson(config.resMsg.userFollowedExist, 200));
        }
      });

  //   } else {
  //     res.status(200).send(config.resJson(config.resMsg.userNotFound, 200));
  //   }

  //  });



}

function deleteFollow(req, res) {

  dbFollow.findOne({
    //usamos la estructura del OR de mongoose
    $and: [{ user: Follow(req).user }, { followed: Follow(req).followed }]
  }, (err, data) => {

    if (err) return res.status(500).send(config.resJson(config.resMsg.userUnfollowedErr, 500));

    if (data == null) {
      if (!req.body.followed) return res.status(500).send(config.resJson(config.resMsg.userNotFound, 500));
      res.status(200).send(config.resJson(config.resMsg.userNotFollowed, 200));
    } else {
      //se tomaran los valores del usuario y se registrara el follow en la DB
      dbFollow.remove(Follow(req), (err, data) => {
        //si ocurre algun error pues lo retornaremos
        if (err) return res.status(400).send(config.resJson(config.resMsg.userUnfollowedErr, 400));
        //sino retornaremos un mensaje exitoso
        res.status(200).send(config.resJson(config.resMsg.userUnfollowedOK, 200));
      });

    }
  });

}

function getFollowingUsers(req, res) {
  const user_id = req.params.id;

  let Page = 1;

  if (req.query.page) {
    Page = req.query.page;
  }

  let itemsPerPage = 4;

  dbFollow.find({ user: user_id }).populate({ path: 'followed' }).paginate(Page, itemsPerPage, (err, users, total) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.requestErr, 500));

    if (!users) return res.status(404).send(config.resJson(config.resMsg.notUsers, 404));

    return res.status(200).send({
      users,
      total,
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