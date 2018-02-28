'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');
const userRouter = require('./routes/user');
const publicationRouter = require('./routes/publication');
const followRouter = require('./routes/follow');


//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//middlewares -: es un metodo que se ejecuta antes que llegue a un controlador
//usar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));



//rutas

app.use('/app-follow', followRouter);
app.use('/app', publicationRouter);
app.use('/app', userRouter);

app.use(function (err, req, res, next) {  
  res.status(500).send('Something broke!')
})



module.exports = app;
