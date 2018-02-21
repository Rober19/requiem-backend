'use strict'

const config = require('../config/config');
const mongoose = require('../config/db-mongoose');

const follow = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, config.resMsg.fieldRequired]
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, config.resMsg.fieldRequired]
  }
});

module.exports = mongoose.model('follow', follow);