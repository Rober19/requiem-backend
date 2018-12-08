'use strict'

const config = require('../config/config');
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
app.put('/update-user', middle_auth.ensure_Auth, userController.updateUser)

//esta petición es para la subida de la imagen del usuario en sesion
app.post('/upload-image-user', [middle_auth.ensure_Auth, middle_file.image_valid], userController.uploadImage);

// esta petición es para obtener la imagen del usuario por parametros
app.get('/get-image-user/:id/:imageFile', userController.getImageUser);

app.get('/get-counters/:id', middle_auth.ensure_Auth, userController.getUser_Counters)

// este es de prueba get
app.get('/get', (req, res) => {
  res.status(200).send({ data: 'conecté' });
});

// app.get('/generateuser', (req, res) => {


//     fetch('http://192.168.1.67:3000/generateuser')
//       .then(res1 => res1.json())
//       .then(
//         json => {
//           console.log(json.nick)
//           res.status(200).send(json);
//         }
//       );
  
// });



module.exports = app;
