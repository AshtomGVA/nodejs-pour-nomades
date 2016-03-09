var express = require('express');
var router = express.Router();

var answers = require('./pools/answers');
router.use('/:poolid/answers', answers);

var results = require('./pools/results');
router.use('/:poolid/results', results);

/*
var users = require('./users');
router.use('/:poolid/users', users);
*/

/* GET pools */
router.get('/', function(req, res, next) {
  res.status(500).send('not implemented yet.').end();
});

/* GET pools */
router.get('/:poolid', function(req, res, next) {
  res.status(500).send('not implemented yet.').end();
});

/* POST pools */
router.post('/', function(req, res, next) {
  res.status(500).send('not implemented yet.').end();
});

module.exports = router;
