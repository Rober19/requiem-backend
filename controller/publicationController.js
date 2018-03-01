'use strict'

const path = require('path');
const fs = require('fs');
const config = require('../config/config');
const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');

const dbPublication = require('../model/publication');
const dbFollow = require('../model/follow');
const dbUser = require('../model/user');


function modelPub(req) {
  const publication = {
    text: req.body.text,
    file: null,
    created_at: moment().unix(),
    user: req.user.sub
  }
  return publication;
}

function createPublication(req, res) {    
      //se tomaran los valores
      dbPublication.create(modelPub(req), (err, data) => {
        //si ocurre algun error pues lo retornaremos
        if (err) return res.status(400).send(config.resJson(config.resMsg.error, 400));
        //sino retornaremos un mensaje exitoso
        res.status(200).send(config.resJson(config.resMsg.confirm, 200));
      });
    
  
}

module.exports = {
  createPublication
}