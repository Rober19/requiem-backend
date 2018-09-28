'use strict'

const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config/config');
const userRouter = require('./routes/user');
const publicationRouter = require('./routes/publication');
const followRouter = require('./routes/follow');
const messageRouter = require('./routes/message');
const cors = require('cors')

//cors
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, user, admin_secret");
  next();
});

//middlewares -: es un metodo que se ejecuta antes que llegue a un controlador
//usar body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

//rutas
app.use('/app', followRouter);
app.use('/app', messageRouter);
app.use('/app', userRouter);
app.use('/app', publicationRouter);

app.use(function (err, req, res, next) {  
  res.status(500).send(`${err}`)
})

module.exports = app;