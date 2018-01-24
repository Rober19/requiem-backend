'use strict'

const config = require('../config/config');
const Model = require('../model/user');

function userCreate(req, res){
  
  const user = {
    name: req.body.name,
    surname: req.body.surname,
    nick: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image
  }

  Model.create(user, (err, data) => {
    if (err) return console.log(err);
        
    res.status(200).send(data)
  })

}

module.exports = {
  userCreate
}
