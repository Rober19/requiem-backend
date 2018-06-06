'use strict'

const config = require('../config/config');
const mongoose = require('../config/db-mongoose');

const publication = mongoose.Schema({
  text: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  file: {
    type: String
  },
  created_at: {
    type: String,
    required: [true, config.resMsg.fieldRequired]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, config.resMsg.fieldRequired]
  }
});

module.exports = mongoose.model('publication', publication);