'use strict'

const config = require('../config/config');
const mongoose = require('../config/db-mongoose');

const message = mongoose.Schema({
  emitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, config.resMsg.fieldRequired]
  },
  receiver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, config.resMsg.fieldRequired]
  },
  text: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  seen:{
    type: String    
  },
  created_at: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  }
});

module.exports = mongoose.model('message', message);