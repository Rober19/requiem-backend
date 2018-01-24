'use strict'

const config = require('../config/config');
const mongoose = require('../config/db-mongoose');

const follow = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('follow', follow);