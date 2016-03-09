/**
 * Created by leojpod on 2/23/16.
 */
var jwt = require('jsonwebtoken');

var mockUpData = require('./../mock-up-data');
var config = require('./../config');

var authentication = {
  authenticateUser: function(nameOrEmail, candidatePassword) {
    //TODO utiliser le contenu de mockup data pour valider ou refuser
    // l'authentification d'un utilisateur
    if(mockUpData.users[nameOrEmail]) {
      if(mockUpData.users[nameOrEmail].password == candidatePassword) {
        console.log('Successfully authenticated!!!!');

        /*var token = jwt.sign({id:mockUpData.users[nameOrEmail].id},config.secretTokenKey);
        console.log('Token', token);
        */
        //console.log({id:mockUpData.users[nameOrEmail].id});
        jwt.sign({id:mockUpData.users[nameOrEmail].id},config.secretTokenKey, {}, function(token){
          return token;
        });
      }
    }
    else {
      console.log('Authentication failed...')
    }
    //var token = jwt.sign
    return false;
  },

  isRequestAuthenticated: function(req, next) {
    //TODO chercher la présence du token d'authentification dans :
    // - body, query et headers (x-access-token)
    // utiliser jwt.verify pour s'assurer de la validité du token
  },

  handleRequest: function(req, res) {
    console.log('request for authentication');
    //TODO chercher la méthode de la requête et déterminer que faire:
    // - tenter d'authentifier l'utilisateur
    // - vérifier si la requête est authentifiée
    switch(req.method) {
      case 'GET': 
        authentication.isRequestAuthenticated(req,function(err,res){});
        break;
      case 'POST':
        if(req.body === undefined) {
          res.writeHead(403);
          res.write({});
          res.end();
        }
        else if(req.body.identifier && req.body.password) {
          var token = authentication.authenticateUser(req.body.identifier, req.body.password);
          console.log('Token',token)
          if(token) {
            res.writeHead(200);
            res.write({token: token});
            res.end;
          }
        }
        break;
    }    
    /*
    res.writeHead(500);
    res.write('{ "error": "unimplemented"}');
    res.end();
    */
  }
};

module.exports = authentication;
