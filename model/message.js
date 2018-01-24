'use strict'

const config = require('../config/config');
const mongoose = require('../config/db-mongoose');

const message = mongoose.Schema({
  emitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  receiver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: String,
  created_at: String
});

module.exports = mongoose.model('message', message);