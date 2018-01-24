

'use strict'

const app = require('express').Router();
const userController = require('../controller/userController');

// este es el post que recibe la funcion de Registro del controlador
app.post('/register', userController.createUser);
// este es el que se ocupa del login
app.post('/login', userController.loginUser);

module.exports = app;
