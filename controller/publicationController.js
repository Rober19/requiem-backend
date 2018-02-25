'use strict'

const path = require('path');
const fs = require('fs');
const config = require('../config/config');
const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');
const dbPublication = require('../model/publication');
const dbFollow = require('../model/follow');
const dbUser = require('../model/user');


function test(req, res){
  config.resTest(res);
}

module.exports = {
  test
}