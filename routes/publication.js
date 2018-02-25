'use strict'

const express = require('express');
const app = express.Router();
const middlw_auth = require('../middlewares/authenticated');
const config = require('../config/config');
const publicationController = require('../controller/publicationController');

app.get('/test', publicationController.test);

module.exports = app;