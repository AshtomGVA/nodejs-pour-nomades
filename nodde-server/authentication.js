/**
 * Created by leojpod on 3/3/16.
 */

 //require packages
var jwt = require('jsonwebtoken');

//require locals
var config = require('./config.js');
var mockUpData = require('./mock-up-data.js');

var authentication = {
  authenticateUser: function(nameOrEmail, candidatePassword) {
    //fake DATA for now:
    console.log('authenticate user with %s and %s', nameOrEmail, candidatePassword);
    if (mockUpData.users.john.name !== nameOrEmail
      && mockUpData.users.john.email !== nameOrEmail) {
      console.log('wrong id');
      return false;
    }
    //check the password:
    return (mockUpData.users.john.password === candidatePassword);
  },
  checkAuthentication: function (req, cb){
    // look for the token in the incoming request:
    var token = req.body.token || req.query.token ||
      req.headers['x-access-token'];

    if (token === undefined) {
      //there is no token!
      cb(false);
    } else {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          cb(false);
        } else {
          req.decoded = decoded;
          cb(true);
        }
      });
    }
  },
  authenticatedRoute: function (req, res, next) {
    authentication.checkAuthentication(req, function (isAuth) {
      if (isAuth) {
        // the user has a proper token: let's call next
        next();
      } else {
        res.status(403).json({ success: false, message: 'you need to authenticate to access this part of the API'});
      }
    });
  }
};


module.exports = authentication;
