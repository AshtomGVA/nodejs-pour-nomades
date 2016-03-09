var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../config.js');
var authentication = require('../authentication');

/* GET authenticate */
router.get('/', function(req, res, next) {
	authentication.checkAuthentication(req,function(isAuth){
		res.status(200).send({success:isAuth}).end();
	});
});

/* POST authenticate */
router.post('/', function(req, res, next) {
	if(authentication.authenticateUser(req.body.identifier, req.body.password)) {
		jwt.sign({id:req.body.identifier},config.secret, {}, function(token){
			res.status(200).send({success:true,token:token}).end();
		});
	}
	else {
  		res.status(403).send({success:false}).end();
	}
});

module.exports = router;
