var express = require('express');
var router = express.Router();

var mockupData = require('../mock-up-data');
var authentication = require('../authentication');
var serializer = require('../serializers/user-serializer');

getUserById = function(id) {
	var users = mockupData.users;
	console.log(users)
	for(user in users) {
		if(users[user].id == id) return users[user];
	}
	return null;
}

router.use(authentication.authenticatedRoute);

/* GET users listing. */
router.get('/', function(req, res, next) {
	var users = [];
	for(name in mockupData.users) {
		var user = mockupData.users[name];
		user.name = name;
		users.push(user);
	}
  	res.status(200).send(serializer.serialize(users)).end();
});

/* GET users */
router.get('/:number', function(req, res, next) {
	if(!isNaN(req.params.number)) {
		var user = serializer.serialize(getUserById(req.params.number));
		if(user) res.status(200).send(user).end();
		else res.status(200).json(serializer.serialize({})).end();
	}
	else res.status(400).json({error:'invalid parameter'}).end();
});

module.exports = router;
