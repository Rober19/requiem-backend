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
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, user, admin_secret");
//   next();
// });

//middlewares -: es un metodo que se ejecuta antes que llegue a un controlador
//usar body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

//rutas
// app.use('/app', followRouter);
// app.use('/app', messageRouter);
// app.use('/app', userRouter);
// app.use('/app', publicationRouter);

app.get('/', (req, res ) => {
  res.send({msg: 'Ya!'})
})

app.use((err, req, res, next) => {
  res.status(500).send(`${err}`);
  next();
});

module.exports = app;
