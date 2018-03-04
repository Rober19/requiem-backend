'use strict'

const path = require('path');
const config = require('../config/config');
const moment = require('moment')
const jwt = require('jwt-simple');
const fetch = require('node-fetch');
//aqui requerimos multer para validar la subida de archivos
const multer = require('multer');
const dbPublication = require('../model/publication');

exports.image_valid = async function (req, res, next) {

  req.headers.user = req.user.sub;
  let value = await fetch(`${config.ip_fetch.temp}/app/upload-image-user`, { method: 'POST', body: req, headers: req.headers });
  let data = await value.json();

  if (data.data == config.resMsg.confirm) {
    req.file_name = data.file_name;
    next();
  } else {
    return res.status(200).send(data);
  }

}

exports.file_valid = async function (req, res, next) {

  const resp = findpub(req, res).then((data) => {
    return data;
  }).catch(err => {

  })

  if (resp == null || resp == undefined) return res.status(400).send(config.resJson(config.resMsg.error, 400))
  if (resp.file && resp.file != null) return res.status(400).send(config.resJson(config.resMsg.public_fileExist, 400))

  req.headers.user = req.user.sub
  let value = await fetch(`${config.ip_fetch.temp}/app/upload-file-pub/${req.params.id}`, { method: 'POST', body: req, headers: req.headers });
  let data = await value.json();

  if (data.data == config.resMsg.confirm) {
    req.file_name = data.file_name;
    next();
  } else {
    return res.status(200).send(data);
  }
}

async function findpub(req, res) {
  let value = await dbPublication.findOne({ _id: req.params.id, user: req.user.sub }, (err, data) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.error, 500));
    return data;
  });
  return value;
}