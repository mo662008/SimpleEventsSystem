const jwt = require('jsonwebtoken');

module.exports.login = (request, response, next) => {
  let token;
  if (request.body.email == 'm@m.m' && request.body.password == '123') {
    token = jwt.sign({
      email: request.body.email,
      role: "admin"
    }, process.env.JWT_KEY,
    {expiresIn: "1h"});
    response.status(200).json({message: "login", token});
  } else {
    next(new Error("User name and password incorrect"));
  }
}