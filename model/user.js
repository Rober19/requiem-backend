'use strict'

const mongoose = require('../config/db-mongoose');
const config = require('../config/config');

const user = mongoose.Schema({
  name: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  surname: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  nick: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  email: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  password: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  role: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  image: {
    type: String,
    required: [true, config.resMsg.fieldRequired],
    default: config.ip_fetch.ip_defaul_user_image
  }
});

module.exports = mongoose.model('user', user);