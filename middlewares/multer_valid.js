'use strict'

const path = require('path');
const config = require('../config/config');
const moment = require('moment')
const jwt = require('jwt-simple');

//aqui requerimos multer para validar la subida de archivos
const multer = require('multer');


exports.image_valid = function (req, res, next) {

  // establecemos el tamaño maximo que podran tener la imagenes en este caso
  const maxSize_image = 3 * 1024 * 1024;
  const maxFile_image = 1;
  const dest_dir = `./uploads/users/${req.user.sub}/`

  //configuramos el Storage para que nombre el archivo y lo ubique cuando sea descargado
  const storage = multer.diskStorage({
    destination: dest_dir,
    filename: (req, file, cb) => {
      const user_id_token = jwt.encode(req.user.sub, config.secret_name_image);
      let file_name = '';

      if (path.extname(file.originalname) == '.gif') {
        file_name = user_id_token + '--' + Date.now() + '--' + path.extname(file.originalname)
      } else {
        file_name = user_id_token + '--' + Date.now() + '--' + '.png'
      }
      cb(null, file_name);
      req.file_name = file_name;

    }
  });

  // configuramos el upload, estableciendo limites y filtros para subir solo archivos validos
  const upload = multer({

    limits: { fileSize: maxSize_image },
    fileFilter: function (req, file, cb) {

      if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif') {
        //aqui se descargó correctamente
        cb(null, true);
      } else {
        //pero aqui retornara cualquier error
        req.fileValidationError = config.resMsg.extensionInvalid;
        return cb(null, false, new Error(config.resJson(req.fileValidationError, 500)));
      }

    },
    dest: dest_dir,
    storage: storage
  });

  //establecemos que se subirá aquel dato que en body se llame ('image')
  const md_image = upload.fields([{ name: 'image', maxCount: maxFile_image }]);

  //aqui se procesaran los datos a ver si todo es valido
  md_image(req, res, (err) => {

    if (req.files.image == undefined) return res.status(500).send(config.resJson(config.resMsg.requiredFile, 500));

    if (req.fileValidationError) {
      return res.status(500).send(config.resJson(req.fileValidationError, 500));
    }

    if (err && err.code == 'LIMIT_UNEXPECTED_FILE') return res.status(500).send(config.resJson((config.resMsg.limit_unexpectedFiles + ` : ${maxFile_image} ${config.resMsg.file}`), 500));

    if (err && err.code == 'LIMIT_FILE_SIZE') return res.status(500).send(config.resJson((config.resMsg.limit_fileSize + ` : ${maxSize_image / 1048576}MB`), 500));

    if (err) return res.status(500).send(config.resJson((err), 500));


    next();
  })

}

exports.file_valid = function (req, res, next) {

  // establecemos el tamaño maximo
  const maxSize_file = 3 * 1024 * 1024;
  const maxFile = 1;
  const dest_dir = `./uploads/users/${req.user.sub}/`

  //configuramos el Storage para que nombre el archivo y lo ubique cuando sea descargado
  const storage = multer.diskStorage({
    destination: dest_dir,
    filename: (req, file, cb) => {
      let file_name = `pub-${moment().unix()}${path.extname(file.originalname)}`;
      cb(null, file_name);
      req.file_name = file_name;
    }
  });

  // configuramos el upload, estableciendo limites y filtros para subir solo archivos validos
  const upload = multer({
    limits: { fileSize: maxSize_file },
    fileFilter: function (req, file, cb) {
      cb(null, true);
    },
    dest: dest_dir,
    storage: storage
  });

  //establecemos que se subirá aquel dato que en body se llame ('file')
  const md_image = upload.fields([{ name: 'file', maxCount: maxFile }]);

  //aqui se procesaran los datos a ver si todo es valido
  md_image(req, res, (err) => {

    if (req.files.file == undefined) return res.status(500).send(config.resJson(config.resMsg.requiredFile, 500));

    if (err && err.code == 'LIMIT_UNEXPECTED_FILE') return res.status(500).send(config.resJson((config.resMsg.limit_unexpectedFiles + ` : ${maxFile} ${config.resMsg.file}`), 500));

    if (err && err.code == 'LIMIT_FILE_SIZE') return res.status(500).send(config.resJson((config.resMsg.limit_fileSize + ` : ${maxSize_file / 1048576}MB`), 500));

    if (err) return res.status(500).send(config.resJson((err), 500));


    next();
  })

}