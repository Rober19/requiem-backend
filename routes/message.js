'use strict'

const express = require('express');
const app = express.Router();
const middlw_auth = require('../middlewares/authenticated');
const messageController = require('../controller/messageController');

app.get('/test', messageController.test);

module.exports = app;