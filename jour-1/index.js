var http = require('http');
var fiboAsync = require('async-fibo');
var randomName = require('./random/name');
var querystring = require('querystring');
var url = require('url');

var resultCache = [];
var clientCount = 0;

function entryPoint(request, response) {
	switch(request.method) {
		case 'GET':
			writeFibo(request, response);
			break;
		case 'POST':
			writeJson(request, response);
			break;
	}
}

function writeFibo(request, response) {
	clientCount++;
	response.writeHead(200,{'Content-type': 'text/plain'});
	response.write('Hello '+randomName()+'\n');
	response.write('Dear user #'+clientCount+'\n');

	var current_url = url.parse(request.url);
	//console.log(current_url);
	var randIndex = querystring.parse(current_url.query).number;
	if(!randIndex) var randIndex = Math.ceil(Math.random()*5) + 35;
	
	console.log('Calculating Fibo of '+randIndex+' for user '+clientCount);
	/*
	var result = fibo(randIndex);
	console.log('Found result for user '+clientCount+': '+result);
	*/
	var result = fiboCache(randIndex);
	console.log('Found result for user '+clientCount+': '+result);
	//var result = fiboAsync(randIndex, function(v) {return v;});
	response.write('La suite de Fibonacci de '+randIndex+' vaut '+result);
	response.end();
}

function writeJson(request, response) {
	response.writeHead(200,{'Content-type': 'text/json'});
	var current_url = url.parse(request.url);
	//console.log(current_url);
	var params = querystring.parse(current_url.query);
	if(params.number) params.result = fiboCache(params.number);
	var json = JSON.stringify(params);
	response.write(json);
	response.end();
}

function fibo(index) {
	if(index<=0) return 0;
	else if(index==1) return 1;
	else return fibo(index-1)+fibo(index-2);
}

function fiboCache(index) {
	if(index<=0) return 0;
	else if(index==1) return 1;
	else if(resultCache[index]) return resultCache[index];
	else {
		resultCache[index] = fiboCache(index-1)+fiboCache(index-2);
		return resultCache[index];
	}
}

var server = http.createServer(entryPoint);
server.listen(8888);

console.log('Server started at port 8888');