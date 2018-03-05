'use strict'

const express = require('express');
const app = express.Router();
const middle_auth = require('../middlewares/authenticated');
const middle_file = require('../middlewares/multer_valid');
const middle_pub = require('../middlewares/pub_exist');
const config = require('../config/config');
const publicationController = require('../controller/publicationController');

app.post('/publication', middle_auth.ensure_Auth, publicationController.createPublication);

app.post('/upload-file-pub', middle_auth.ensure_Auth, middle_pub.find_pub)

app.post('/upload-test', [middle_auth.ensure_Auth], (req, res) => {
  res.status(200).send('hola');
})
//,middle_file.file_valid], publicationController.uploadImagePub);

app.get('/publication/:id', middle_auth.ensure_Auth, publicationController.getPublication);
app.get('/publications', middle_auth.ensure_Auth, publicationController.getPublications);
app.delete('/publication/:id', middle_auth.ensure_Auth, publicationController.deletePublication);


app.get('/get-file-pub/:id/:imageFile', publicationController.getImagePub);

module.exports = app;