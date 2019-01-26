'use strict';

const express = require('express');
const app = express.Router();
const middle_auth = require('../middlewares/authenticated');
const middle_file = require('../middlewares/multer_valid');
const middle_pub = require('../middlewares/pub_exist');
const publicationController = require('../controller/publicationController');

app.post('/publication', middle_auth.ensure_Auth, publicationController.createPublication);
app.get('/publication/:id', middle_auth.ensure_Auth, publicationController.getPublication);
app.get('/publications/:id', middle_auth.ensure_Auth, publicationController.getPublications);

app.delete('/publication/:id', middle_auth.ensure_Auth, publicationController.deletePublication);

app.post(
  '/upload-file-pub/:id',
  [middle_auth.ensure_Auth, middle_pub.find_pub, middle_file.file_valid],
  publicationController.uploadImagePub,
);

app.get('/get-file-pub/:id/:imageFile', publicationController.getImagePub);

module.exports = app;
