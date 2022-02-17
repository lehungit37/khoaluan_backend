const jwt = require("jsonwebtoken");
const _APP = require("../constant/_APP");
//create token
const make = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: user },
      _APP.ACCESS_TOKEN,
      {
        algorithm: "HS256",
        expiresIn: _APP.TOKEN_TIME_LIFE
      },
      (err, _token) => {
        if (err) {
          return reject(err);
        } else {
          console.log(_token);
          return resolve(_token);
        }
      }
    );
  });
};

//check token
const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, _APP.ACCESS_TOKEN, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = { makeToken: make, checkToken };
