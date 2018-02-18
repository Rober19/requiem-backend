
const path = require('path');
const config = require('../config/config');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: './uploads/users/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
  }
});
const maxSize_image = 2 * 1024 * 1024;
const upload = multer({ dest: './uploads/users/', limits: { fileSize: maxSize_image }, storage});
const md_image = upload.any('image');

exports.image_valid = function (req, res, next) {
  md_image(req, res, (err) => {
    if (err) return res.status(500).send(config.resJson((config.resMsg.limit_fileSize + ` : ${maxSize_image/1048576}MB`), 500));
    return res.status(200).send(config.resJson(config.resMsg.confirm, 200));
  });
}

exports.file_valid = function (req, res, next) {

}