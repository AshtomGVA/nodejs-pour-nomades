var express = require('express');
var router = express.Router();

var answers = require('./pools/answers');
router.use('/:number/answers', answers);

var results = require('./pools/results');
router.use('/:number/results', results);

var serializer = require('../serializers/pool-serializer');
var mockupData = require('../mock-up-data');

var authentication = require('../authentication');


getPoolById = function(id) {
	var pools = mockupData.pools;
	for(pool in pools) {
		if(pools[pool].id == id) return pools[pool];
	}
	return null;
	
}

router.use(authentication.authenticatedRoute);

/* GET pools */
router.get('/', function(req, res, next) {
	var pools = serializer.serialize(mockupData.pools);
  	res.status(200).send(pools).end();
});

/* GET pools */
router.get('/:number', function(req, res, next) {
	if(!isNaN(req.params.number)) {
		var pool = serializer.serialize(getPoolById(req.params.number));
		if(pool) res.status(200).json(pool).end();
		else res.status(200).json(serializer.serialize({})).end();
	}
	else res.status(400).json({error:'invalid parameter'}).end();
});

/* POST pools */
router.post('/', function(req, res, next) {
  res.status(500).send('not implemented yet.').end();
});

module.exports = router;
