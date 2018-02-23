'use strict'

const path = require('path');
const fs = require('fs');
const config = require('../config/config');
const mongoosePaginate = require('mongoose-pagination');
const dbFollow = require('../model/follow');

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

  dbFollow.findOne({
    //usamos la estructura del OR de mongoose
    $and: [{ user: Follow(req).user }, { followed: Follow(req).followed }]
  }, (err, data) => {

    if (err) return res.status(500).send(config.resJson(config.resMsg.userFollowedErr, 500))

    

    if (data == null) {
      //se tomaran los valores del usuario y se registrara el follow en la DB
      dbFollow.create(Follow(req), (err, data) => {
        //si ocurre algun error pues lo retornaremos
        if (err) return res.status(400).send(config.resJson(config.resMsg.userFollowedErr, 400));
        //sino retornaremos un mensaje exitoso
        res.status(200).send(config.resJson(config.resMsg.userFollowedOK, 200));
      });
    } else {
      //res.status(200).send(config.resJson(config.resMsg.userFollowedOK, 200));
      res.status(200).send(config.resJson(data, 200));
    }
 


  });



}

module.exports = {
  createFollow
}