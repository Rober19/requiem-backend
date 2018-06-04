'use strict'

const path = require('path');
const config = require('../config/config');
const moment = require('moment')
const jwt = require('jwt-simple');
const express = require('express');
const app = express();
const firebase = require('firebase');
const googleStorage = require('@google-cloud/storage');

const shortid = require('shortid');
const fetch = require('node-fetch');
//aqui requerimos multer para validar la subida de archivos
const Multer = require('multer');
const dbPublication = require('../model/publication');

exports.image_valid = async function (req, res, next) {

  let folderPath = `Requiem-project/Profile-image/${req.user.sub}`;
  let nameFile = req.user.sub;
  let formData_Key = 'image';
  let tokenId = shortid.generate();
  let maxSize_file = 5 * 1024 * 1024;
  const gs_bucket = 'gs://rober-firebase.appspot.com';

  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: maxSize_file
    },
    fileFilter: (req, file, cb) => {

      if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif') {
        //aqui se descargó correctamente
        cb(null, true);
      } else {
        //pero aqui retornara cualquier error
        req.fileValidationError = config.resMsg.extensionInvalid;
        return cb(null, false, new Error(config.resJson(req.fileValidationError, 500)));
      }

    }
  });

  const storage = googleStorage({
    //keyFilename: "middlewares/rober-credentials.json",
    projectId: 'rober-firebase',
    credentials: config.google_cloud_credentials
  });

  const uploadImageToStorage = await function (file) {
    let prom = new Promise((resolve, reject) => {
      if (!file) {
        reject(config.resMsg.requiredFile);
      }
      //let newFileName = `Requie/${file.originalname}`;
      let newFileName = `${folderPath}/${nameFile}`;
      const bucket = storage.bucket(gs_bucket);

      let fileUpload = bucket.file(newFileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: tokenId
          }
        },
      });

      blobStream.on('error', (error) => {
        reject(`${config.resMsg.error} : blobStream.on`);
      });

      blobStream.on('finish', (data) => {
        // The public URL can be used to directly access the file via HTTP.
        const url = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(fileUpload.name) + "?alt=media&token=" + tokenId;
        fileUpload.getSignedUrl({
          action: 'read'
        }).then(signedUrls => {
          // signedUrls[0] contains the file's public URL

        });
        resolve(url);
      });

      blobStream.end(file.buffer);
    });
    return prom;
  }

  const md_image = multer.single(formData_Key);

   md_image(req, res, (err) => {    
    let file = req.file;    
    if (file && !err) {
      uploadImageToStorage(file).then((url) => {
        req.file_name = url;
        next();
      }).catch((error) => {
        console.error(error);
        return res.status(400).send({
          status: error
        });
      });
    } else {

      if (err && err.code == 'LIMIT_UNEXPECTED_FILE') return res.status(500).send(config.resJson((config.resMsg.limit_unexpectedFiles + ` : ${1} ${config.resMsg.file}`), 500));

    if (err && err.code == 'LIMIT_FILE_SIZE') return res.status(500).send(config.resJson((config.resMsg.limit_fileSize + ` : ${maxSize_file / 1048576}MB`), 500));

      return res.status(400).send({
        data: config.resMsg.requiredFile
      });
    }

    
  });

}

exports.file_valid = async function (req, res, next) {

  req.headers.user = req.user.sub
  let value = await fetch(`${config.ip_fetch.temp}/app/upload-file-pub/${req.params.id}`, { method: 'POST', body: req, headers: req.headers });
  let data = await value.json();

  if (data.data == config.resMsg.confirm) {
    req.file_name = data.file_name;
    next();
  } else {
    return res.status(200).send(data);
  }
}

