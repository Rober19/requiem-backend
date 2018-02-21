'use strict'

const express = require('express');
const app = express.Router();
const middlw_auth = require('../middlewares/authenticated');
const followController = require('../controller/followController');

app.post('/follow', middlw_auth.ensure_Auth, followController.createFollow);

module.exports = app;