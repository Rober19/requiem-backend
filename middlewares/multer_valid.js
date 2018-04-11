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

  // req.headers.user = req.user.sub;
  // let value = await fetch(`${config.ip_fetch.temp}/app/upload-image-user`, { method: 'POST', body: req, headers: req.headers });
  // let data = await value.json();

  // if (data.data == config.resMsg.confirm) {
  //   req.file_name = data.file_name;
  //   next();
  // } else {
  //   return res.status(200).send(data);
  // }

  let folderPath = `Requiem-project/Profile-image/${req.user.sub}`;
  let nameFile = req.user.sub;
  let formData_Key = 'image';
  let tokenId = shortid.generate();

  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
  });

  const storage = googleStorage({
    keyFilename: "middlewares/rober-credentials.json"
  });

  const uploadImageToStorage = await function (file) {
    let prom = new Promise((resolve, reject) => {
      if (!file) {
        reject(config.resMsg.requiredFile);
      }
      //let newFileName = `Requie/${file.originalname}`;
      let newFileName = `${folderPath}/${nameFile}`;
      const bucket = storage.bucket("gs://rober-firebase.appspot.com");

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

        reject(error);
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
    if (file) {
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
      return res.status(400).send({
        status: config.resMsg.requiredFile+11
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

