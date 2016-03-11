/**
 * Created by leojpod on 3/10/16.
 */
var async = require('async');
var MongoClient= require('mongodb').MongoClient;

var MongoURL = 'mongodb://localhost:27017/example';
var db;

var findRestaurants = function(db,cb) {
	//var cursor = db.collection('restaurants').find({'cuisine':{$regex: /.*Vegetarian.*/},'borough':'Manhattan'});
	//var cursor = db.collection('restaurants').find({'address.zipcode': {$eq:'10003'}});
	var cursor = db.collection('restaurants').find({'grades.grade': {$eq:'A'}});
	console.log('Starting results');
	cursor.each(function(err, doc) {
		if(err) throw err;
		//assert.equal(err, null);
		if(doc != null) {
			console.dir(doc);
		} else {
			cb();
		}
	});
};

MongoClient.connect(MongoURL, function (err, dbAccess) {
	if(err) throw err;
	//assert.equal(null, err);
	findRestaurants(dbAccess, function() {
		dbAccess.close();
	});
});

