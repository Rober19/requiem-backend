

'use strict'
//requerimos express con su metodo router
const app = require('express').Router();
//instanciamos el controlador de usuarios para usar sus metodos
const userController = require('../controller/userController');
//requerimos el middleware de autenticacion de permisos
const middle_auth = require('../middlewares/authenticated');

// este es el post que recibe la funcion de Registro del controlador
app.post('/register', userController.createUser);
// este es el que se ocupa del login
app.post('/login', userController.loginUser);
// este es de prueba get
app.get('/get', (req, res)=>{
  res.status(200).send('conecté');
});

app.get('/user/:id',middle_auth.ensure_Auth, userController.getUser);
app.get('/users/:page',middle_auth.ensure_Auth, userController.getUsers);

module.exports = app;
