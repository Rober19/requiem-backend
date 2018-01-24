

'use strict'

const app = require('express').Router();
const userController = require('../controller/userController');

app.post('/register', userController.createUser);


module.exports = app;
