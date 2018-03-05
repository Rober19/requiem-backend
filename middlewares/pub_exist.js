'use strict'


const config = require('../config/config');
const dbPublication = require('../model/publication');



exports.find_pub = async function (req, res, next) {  

  dbPublication.findOne({ _id: req.params.id, user: req.user.sub }, (err, data) => {
    return res.status(300).send(config.resJson('Parada', 300));
    if (err) return res.status(500).send(config.resJson(config.resMsg.publicationNotFound, 500));
    if (data == null || data == undefined) return res.status(400).send(config.resJson(config.resMsg.publicationNotFound, 400))
    if (data.file && data.file != null) return res.status(400).send(config.resJson(config.resMsg.public_fileExist, 400));
    next();
  });

}
