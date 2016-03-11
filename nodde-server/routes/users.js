var express = require('express');
var utils = require('util');
var bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectID;

var router = express.Router();
var UserSerializer = require('../serializers/user-serializer');
var PoolSerializer = require('../serializers/pool-serializer');
var authentication = require('../authentication.js');

<<<<<<< Updated upstream
var mockupData = require('../mock-up-data');
var User = require('../models/user');
var Pool = require('../models/pool');
=======
router.post('/', function(req,res,next){
  req.checkBody('data.attributes.name', 'Name is required').notEmpty().isAlphanumeric();
  req.checkBody('data.attributes.email', 'Email is invalid').isEmail();
  var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ', 400);
    return;
  }
  var user = {
    'name':req.body.data.attributes.name,
    'email':req.body.data.attributes.email,
    'password':req.body.data.attributes.password
  }

  var check = 
  req.db.collection('users').find({'email':{$eq:user.email}}).toArray().then(function(data){
      if(data.length<=0) {
        req.db.collection('users')
        .insertOne(user,function(err,response){
          if(err) throw err;
          res.status(200).send(UserSerializer.serialize(user)).end();
        })
      }

      console.log('USER',user); 
  });
})

router.use(authentication.authenticatedRoute);
>>>>>>> Stashed changes

/* GET users listing. */
router.get('/', authentication.authenticatedRoute, function(req, res, next) {
  User.find({}).then(function(users) {
    //we browse through them all :
    var jsonMessage = UserSerializer.serialize(users);
    res.json(jsonMessage);
  }, function (err) {
    throw err;
  });
});

router.get('/:id', authentication.authenticatedRoute, function(req, res, next) {
  req.checkParams('id', 'not a valid ObjectId').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.status(403).json({ success: false, errors: errors });
    return;
  }
  var id = ObjectId(req.params.id);
  User.findById(id).then(function (user) {
    if (user) {
      res.json(UserSerializer.serialize(user));
    } else {
      res.json(UserSerializer.serialize(null));
    }
  }, function (err) {
    throw err;
  });
});

router.get('/:id/pools', authentication.authenticatedRoute, function(req, res, next) {
  req.checkParams('id', 'not a valid ObjectId').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.status(403).json({ success: false, errors: errors });
    return;
  }
  var id = ObjectId(req.params.id);

  console.log(id);

  Pool.findAllByAuthor(id,function(pools){
    res.status(200).send(PoolSerializer.serialize(pools)).end();
  });
});

<<<<<<< Updated upstream
router.post('/', function(req, res, next) {
  //validate incoming data:
  //we need a user name of min 6 char long
  req.checkBody('data.type', 'not a user record').equals('users');
  req.checkBody('data.attributes.name', 'not alphanumeric').isAlphanumeric();
  req.checkBody('data.attributes.name', 'too short (6 char min)').isLength({
    min: 6,
    max: undefined
  });
  //we need an email that is a proper email
  req.checkBody('data.attributes.email', 'invalid email').isEmail();
  //we need a password that is at least 6 char long
  req.checkBody('data.attributes.password', 'password too short  (6 char min)').isLength({
    min: 6,
    max: undefined
  });

  var errors = req.validationErrors(true);
  // if any of these parameter does not fit the criteria
  if (errors) {
    res.status(403).json({ success: false, errors: errors });
=======
router.get('/:id', function(req, res, next) {
  var id = Number.parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({error: 'the segment should be an integer'});
>>>>>>> Stashed changes
    return;
  }
  //now we have valid parameters
  var name = req.body.data.attributes.name,
    email = req.body.data.attributes.email,
    password = req.body.data.attributes.password;
  //check with the database if name and email are unique
  var query = User.find({});
  query.or([{ name: name }, { email: email }]);
  query.exec(function(err, doc) {
      if (err) {
        res.status(500).json({ success: false, errors: err });
      } else {
        if (doc) {
          var whichParam = (doc.name === name) ? 'name' : 'email';
          res.status(400).json({
            success: false,
            errors: {
              param: whichParam,
              error: 'non unique field'
            }
          });
        } else {
          //hash password
          bcrypt.hash(password, 10, function(err, hash) {
            if (err) {
              throw err;
            }
            //create new user and insert it
            User.create({
              name: name,
              email: email,
              password: hash
            }, function(err, result) {
              if (err) {
                res.status(500).json({ success: false, error: err });
              } else {
                var jsonMessage = UserSerializer.serialize(result);
                res.json(jsonMessage);
              }
            });
          });
        }
      }
    }
<<<<<<< Updated upstream
  );


=======
  }
  var jsonMessage = UserSerializer.serialize(user);
  res.json(jsonMessage);
>>>>>>> Stashed changes
});

module.exports = router;
