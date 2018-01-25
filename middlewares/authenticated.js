'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config')
const secretKey = 'secret_token_summertime_sadness';

exports.ensure_Auth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send(config.resJson(config.resMsg.nonAuth, 403));
  }

  const token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    const userToken = jwt.decode(token, secret);

    if (userToken.exp <= moment().unix()) {
      return res.status(401).send(config.resJson(config.resMsg.tokenExp))
    }
  } catch (ex) {
    return res.status(404).send(config.resJson(config.resMsg.tokenInvalid, 404));
  }

}