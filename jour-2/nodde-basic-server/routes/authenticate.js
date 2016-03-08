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
        jwt.sign({id:mockUpData.users[nameOrEmail].id},config.secretTokenKey,function(token){
          console.log('Token', token);
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
          authentication.authenticateUser(req.body.identifier, req.body.password);
        }
        break;
    }
    console.log('Auth request method: '+req.method);
    console.log('Auth request query: '+req.query);
    /*
    res.writeHead(500);
    res.write('{ "error": "unimplemented"}');
    res.end();
    */
  }
};

module.exports = authentication;
