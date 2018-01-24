'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');
const userRouter = require('./routes/user');
// cargar rutas


//middlewares -: es un metodo que se ejecuta antes que llegue a un controlador
//usar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

//cors

//rutas
app.use('/app', userRouter);

module.exports = app;
