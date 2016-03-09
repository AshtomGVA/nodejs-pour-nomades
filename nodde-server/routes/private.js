var express = require('express');
var router = express.Router();

var authentication = require('../authentication');

router.use(authentication.authenticatedRoute);

/* GET private */
router.all('/', function(req, res, next) {
  	res.status(200).send({success:true}).end();
});

module.exports = router;
