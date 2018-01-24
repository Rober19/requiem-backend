'use strict'

const config = require('../config/config');
const mongoose = require('../config/db-mongoose');

const publication = mongoose.Schema({
  text: String,
  file: String,
  created_at: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('publication', publication);