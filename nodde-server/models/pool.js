var mongoose = require('mongoose');
var async = require('async');
var Schema = mongoose.Schema;

var poolSchema = new Schema({	
	title: {type: String, required: true},
	questions: [String],
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	keywords: [String]
});

poolSchema.statics.findAllByAuthor = function findAllByAuthor(id, callback) {
	this.find({author:id})
	.then(function(pools){
		console.log('Pools',pools);
		async.map(pools, function(pool,cb){
			console.log('Pool',pool);
			cb(null, pool.toObject());
		}, function(err,poolObjects){
			if(err) throw err;
			console.log('PoolObjects',poolObjects);
			callback(poolObjects);
		});
	}, function(err){
		if(err) throw err;
		callback(null);
	});
}

var Pool = mongoose.model('Pool', poolSchema);

module.exports = Pool;
