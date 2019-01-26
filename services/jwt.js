'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');
const secretKey = config.secret_user_token;

exports.createToken = user => {
  const userToken = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix,
  };
  return jwt.encode(userToken, secretKey);
};
