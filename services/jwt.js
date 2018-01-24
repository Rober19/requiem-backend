'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'secret_token_summertime_sadness';

exports.createToken = function(user){
  const userToken = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  }
  return jwt.encode(userToken, secretKey);
}