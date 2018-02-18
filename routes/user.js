

'use strict'
//requerimos express con su metodo router
const app = require('express').Router();
//instanciamos el controlador de usuarios para usar sus metodos
const userController = require('../controller/userController');
//requerimos el middleware de autenticacion de permisos
const middle_auth = require('../middlewares/authenticated');

const middle_file = require('../middlewares/multer_valid');


// esta peticion es el post que recibe la funcion de Registro del controlador
app.post('/register', userController.createUser);
// esta peticion es la que se ocupa del login
app.post('/login', userController.loginUser);
// esta peticion trae un usuario segun su Id
app.get('/user/:id', middle_auth.ensure_Auth, userController.getUser);
// esta petición trae todos los usuarios paginados
app.get('/users', middle_auth.ensure_Auth, userController.getUsers);
//esta petición modifica los datos del usuario en sesion
app.put('/update-user/:id', middle_auth.ensure_Auth, userController.updateUser)
//esta petición es para la subida de la imagen del usuario en sesion
app.post('/upload-image-user/:id', [middle_auth.ensure_Auth, middle_file.image_valid], userController.uploadImage);

app.use(function (err, req, res, next) {  
  res.status(500).send('Something broke!')
})



// este es de prueba get
app.get('/get', (req, res) => {
  res.status(200).send('conecté');
});



module.exports = app;
