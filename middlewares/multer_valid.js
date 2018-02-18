
const path = require('path');
const config = require('../config/config');

//aqui requerimos multer para validar la subida de archivos
const multer = require('multer');









exports.image_valid = function (req, res, next) {

  //configuramos el Storage para que nombre el archivo y lo ubique cuando sea descargado
  const storage = multer.diskStorage({
    destination: './uploads/users/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  // establecemos el tamaño maximo que podran tener la imagenes en este caso
  const maxSize_image = 3 * 1024 * 1024;
  // configuramos el upload, estableciendo limites y filtros para subir solo archivos validos
  const upload = multer({
    dest: './uploads/users/',
    limits: { fileSize: maxSize_image },
    storage,
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== 'image/png') {
        req.fileValidationError = config.resMsg.extensionInvalid;
        return cb(null, false, new Error(config.resJson(req.fileValidationError, 500)));
      }
      cb(null, true);
    }
  });
  //establecemos que se subirá aquel dato que en body se llame ('image')
  const md_image = upload.any('image');

  //aqui se procesaran los datos a ver si todo es valido
  md_image(req, res, (err) => {

    if (req.fileValidationError) {
      return res.status(500).send(config.resJson(req.fileValidationError, 500));
    }

    if (err) return res.status(500).send(config.resJson((config.resMsg.limit_fileSize + ` : ${maxSize_image / 1048576}MB`), 500));

    next();
  })


}

exports.file_valid = function (req, res, next) {

  const dest_dir = './uploads/users/';
  let ext_file = null;

  const storage = multer.diskStorage({
    destination: dest_dir,
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      ext_file = path.extname(file.originalname);
      console.log(path.extname(file.originalname));
    }
  });

  const maxSize_image = 7 * 1024 * 1024;

  const upload = multer({ dest: dest_dir, limits: { fileSize: maxSize_image }, storage });
  const md_file = upload.any('file');

  md_file(req, res, (err) => {
    if (err) return res.status(500).send(config.resJson((config.resMsg.limit_fileSize + ` : ${maxSize_image / 1048576}MB`), 500));
    return res.status(200).send(config.resJson((config.resMsg.confirm), 200));
  });

}