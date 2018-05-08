'use strict'

const moment = require('moment');

const dbMessage = require('../model/message');
const dbPublication = require('../model/publication');
const dbFollow = require('../model/follow');
const dbUser = require('../model/user');
// la depn fs (fileSystem) para la gestion de archivos y carpetas
const fs = require('fs');
// config pues para las preferencias predeterminadas
const config = require('../config/config');
const mongoosePaginate = require('mongoose-pagination');

function message(req) {
  const message = {
    emitter: req.user.sub,
    receiver: req.body.receiver,
    text: req.body.text,
    seen: false,
    created_at: moment().unix()
  }
  return message;
}

function createMessage(req, res) {
  dbMessage.create(message(req), (err, data) => {
    //si ocurre algun error pues lo retornaremos
    if (err) return res.status(400).send(config.resJson(config.resMsg.error, 400));
    //sino retornaremos un mensaje exitoso
    res.status(200).send(config.resJson(config.resMsg.confirm, 200));
  });
}

function getMessages(req, res) {

  // aqui estara el params.id 
  const user_id = req.user.sub;
  // la pagina inicial y por defecto será la 1
  let Page = 1;
  // si existe una pagina enviada por query pues se cambiará el valor de Page
  if (req.query.page) {
    Page = req.query.page;
  }
  //se mostraran 4 items por pagina
  let itemsPerPage = 100;
  // buscaremos el usuario y mostraremos sus seguidores

  const query = {
    $or: [
      { receiver: req.body.receiver },
      { emitter: req.body.emmiter },
      { receiver: req.body.emmiter },
      { emitter: req.body.receiver }]
  }

  dbMessage.find(query)
    .populate('receiver emitter', '-password -__v -name -surname -email')
    .paginate(Page, itemsPerPage, (err, message, total) => {
      if (err) return res.status(500).send(config.resJson(config.resMsg.requestErr, 500));

      if (!message) return res.status(404).send(config.resJson(config.resMsg.notMessage, 404));

      return res.status(200).send({
        //los datos encontrados
        message,
        //la cantidad de datos hallados
        total,
        //dividimos el total de datos entre los items por pagina) --aproximamos
        pages: Math.ceil(total / itemsPerPage)
      })
    });


}

function getReceivedMessage(req, res) {
  // aqui estara el params.id 
  const user_id = req.user.sub;
  // la pagina inicial y por defecto será la 1
  let Page = 1;
  // si existe una pagina enviada por query pues se cambiará el valor de Page
  if (req.query.page) {
    Page = req.query.page;
  }
  //se mostraran 4 items por pagina
  let itemsPerPage = 4;
  // buscaremos el usuario y mostraremos sus seguidores
  dbMessage.find({ receiver: user_id })
    .populate('receiver emitter', '-password -__v -name -surname -_id -email')
    .paginate(Page, itemsPerPage, (err, message, total) => {
      if (err) return res.status(500).send(config.resJson(config.resMsg.requestErr, 500));

      if (!message) return res.status(404).send(config.resJson(config.resMsg.notMessage, 404));

      return res.status(200).send({
        //los datos encontrados
        message,
        //la cantidad de datos hallados
        total,
        //dividimos el total de datos entre los items por pagina) --aproximamos
        pages: Math.ceil(total / itemsPerPage)
      })
    });


}

function getEmittMessage(req, res) {
  // aqui estara el params.id 
  const user_id = req.user.sub;
  // la pagina inicial y por defecto será la 1
  let Page = 1;
  // si existe una pagina enviada por query pues se cambiará el valor de Page
  if (req.query.page) {
    Page = req.query.page;
  }
  //se mostraran 4 items por pagina
  let itemsPerPage = 4;
  // buscaremos el usuario y mostraremos sus seguidores
  dbMessage.find({ emitter: user_id })
    .populate('receiver emitter', '-password -__v -name -surname -_id -email')
    .paginate(Page, itemsPerPage, (err, message, total) => {
      if (err) return res.status(500).send(config.resJson(config.resMsg.requestErr, 500));

      if (!message) return res.status(404).send(config.resJson(config.resMsg.notMessage, 404));

      return res.status(200).send({
        //los datos encontrados
        message,
        //la cantidad de datos hallados
        total,
        //dividimos el total de datos entre los items por pagina) --aproximamos
        pages: Math.ceil(total / itemsPerPage)
      })
    });


}

function getUnviewedMessage(req, res) {
  // aqui estara el params.id 
  const user_id = req.user.sub;

  // buscaremos el usuario y mostraremos sus seguidores
  dbMessage.count({ receiver: user_id, seen: 'false' }).exec((err, data) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.requestErr, 500));

    return res.status(200).send({ unviewed: data });
  });
}

function setViewedMessages(req, res) {
  const user_id = req.user.sub;

  dbMessage.update({ receiver: user_id, seen: 'false' }, { seen: 'true' }, { "multi": true }, (err, data) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.requestErr, 500));

    return res.status(200).send({ Messages: data.nModified });
  })
}
module.exports = {
  getReceivedMessage,
  createMessage,
  getEmittMessage,
  getUnviewedMessage,
  setViewedMessages,
  getMessages
}