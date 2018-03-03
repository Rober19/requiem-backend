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

function test(req, res) {
  config.resTest(res)
}

module.exports = {
  test
}