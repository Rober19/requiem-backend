'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const [userRouter, publicationRouter, followRouter, messageRouter] = [
  require('./routes/user'),
  require('./routes/publication'),
  require('./routes/follow'),
  require('./routes/message'),
];

//cors
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

//rutas
app.use('/app', followRouter);
app.use('/app', messageRouter);
app.use('/app', userRouter);
app.use('/app', publicationRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Requiem - by Rober19' });
});

app.use((err, req, res, next) => {
  res.status(500).send(`${err}`);
  next();
});

module.exports = app;
