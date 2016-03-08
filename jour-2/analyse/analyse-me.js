/**
 * Created by leojpod on 3/7/16.
 */
var http = require('http');
var url = require('url');
var qs = require('querystring');
var Analysis = require('./analysis');

function handleRequest(request, response) {
  var bodyString = '';

  request.on('data', function (chunk) {
    bodyString += chunk;
    if (bodyString.length > 1e6) {
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      request.connection.destroy();
    }
  });
  request.on('end', function () {
    var decodedBody;
    if (bodyString.length >= 0) {
      //there was a body string
      switch (request.headers['content-type']) {
        case 'application/x-www-form-urlencoded':
          decodedBody = qs.parse(bodyString);
          break;
        case 'application/json':
          decodedBody = JSON.parse(bodyString);
          break;
        default:
          decodedBody = bodyString;
      }
    }
    var reqUrl = url.parse(request.url);
    var analysis = new Analysis();
    request.url = reqUrl;
    request.query = reqUrl.query;
    request.body = decodedBody;
    analysis.analyseRequest(request).displayJSON(response);
  });
}

var server = http.createServer(handleRequest);
server.listen(8888);

console.log('server started');
