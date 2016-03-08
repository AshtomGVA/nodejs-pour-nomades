/**
 * Created by leojpod on 2/29/16.
 */

var url = require('url');
var normalizer = require('../normalizer.js');
var mockUpData = require('../mock-up-data.js');

var users = {
  //TODO faire comme avec pools.js !
    handleRequest: function(req, res) {
    	console.log('Users route handling request: '+req);
    }
};

module.exports = users;
