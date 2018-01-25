

'use strict'

const app = require('express').Router();
const userController = require('../controller/userController');

const middle_auth = require('../middlewares/authenticated');

// este es el post que recibe la funcion de Registro del controlador
app.post('/register', userController.createUser);
// este es el que se ocupa del login
app.post('/login', middle_auth.ensure_Auth, userController.loginUser);

module.exports = app;
