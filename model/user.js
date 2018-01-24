'use strict'

const mongoose = require('../config/db-mongoose');
const config = require('../config/config');

const user = mongoose.Schema({
  name: String,
  surname: String,
  nick: String,
  email: String,
  password: String,
  role: String,
  image: String
});

module.exports = mongoose.model('user', user);