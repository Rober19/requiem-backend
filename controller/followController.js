'use strict'

const path = require('path');
const fs = require('fs');
const config = require('../config/config');
const mongoosePaginate = require('mongoose-pagination');
const dbFollow = require('../model/follow');

function test(req, res) {
  config.resTest(res);
}

module.exports = {
  test
}