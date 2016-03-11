/**
 * Created by leojpod on 3/2/16.
 */

var express = require('express');
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var ObjectId = require('mongodb').ObjectID;
var async = require('async');

var router = express.Router();

var PoolSerializer = require('../serializers/pool-serializer');
var mockupData = require('../mock-up-data');
var authentication = require('../authentication.js');
var Pool = require('../models/pool');


router.use(authentication.authenticatedRoute);

router.get('/', function (req, res, next) {
  Pool.find({}).populate('author').then(function (pools) {
    console.log('Pools: ',pools);
    async.map(pools, function(pool,cb){
      cb(null,pool.toObject());
    }, function (err, poolsObjects) {
      if(err) throw err;
      res.json(PoolSerializer.serialize(poolsObjects));
    });
  }, function(err){
    console.log('Get pools error',err);
  });
});

router.post('/', function (req, res, next) {
  //validate the incomming data:
  req.checkBody('data.type', 'not a pool record').equals('pools');
  req.checkBody('data.attributes.title', 'missing').isLength({min: 1});
  req.checkBody('data.attributes.questions', 'missing').notEmpty();
  new JSONAPIDeserializer({
    users: {
      valueForRelationship: function (relationship) {
        return relationship.id;
      }
    }
  }).deserialize(req.body, function (err, pool) {
    if (err) {
      res.status(400).json({errors: 'malformed JSON-API resource'});
    }
    // console.log('pool', pool);
    // console.log('arguments -> ', arguments);
    Pool.create(pool, function (err, result) {
      if (err) throw err;
      res.json(PoolSerializer.serialize(result));
    });
  });
});

router.get('/:id', function (req, res, next) {
  req.checkParams('id', 'not a valid ObjectId').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.status(403).json({ success: false, errors: errors });
    return;
  }
  var id = ObjectId(req.params.id);
  Pool.findById(id).populate('author').then(function(pools) {
        res.json(PoolSerializer.serialize(pool));
      }, function(err) {

      });
});

router.get('/:id/answers', function (req, res, next) {
  res.status(500).json({ error: 'unimplemented'}).end();
});
router.post('/:id/answers', function (req, res, next) {
  res.status(500).json({ error: 'unimplemented'}).end();
});
router.get('/:id/results', function (req, res, next) {
  res.status(500).json({ error: 'unimplemented'}).end();
});

module.exports = router;
