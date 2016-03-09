var express = require('express');
var router = express.Router();

var pools = require('./pools');
router.use('/:userid/pools', pools);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource').end();
});

/* GET users */
router.get('/:userid', function(req, res, next) {
  res.status(500).send('not implemented yet.').end();
});

module.exports = router;
