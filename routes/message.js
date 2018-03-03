'use strict'

const express = require('express');
const app = express.Router();
const middlw_auth = require('../middlewares/authenticated');
const messageController = require('../controller/messageController');

app.post('/message',middlw_auth.ensure_Auth, messageController.createMessage);
app.get('/my-messages',middlw_auth.ensure_Auth, messageController.getReceivedMessage);
app.get('/messages',middlw_auth.ensure_Auth, messageController.getEmittMessage);



module.exports = app;