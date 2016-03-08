/**
 * Created by leojpod on 3/7/16.
 */
var http = require('http');
var url = require('url');
var qs = require('querystring');
var Analysis = require('./analysis');

function handleRequest(request, response) {
  var bodyString = '';
  //TODO récupérer les informations sur la requete et remplir l'objet suivant:
  request.on('data', function(data){
    bodyString += data;
    if(bodyString.length > 1e6) {
      //Prevent flood attack
      request.connection.destroy();
    }
  });


  /*
  var analysisData = {
    method: null,
    url: null,
    path: null,
    params: {
      query: null,
      body: null
    }
  };

  var parsedURL = url.parse(request.url,true);
  analysisData.method = request.method;
  analysisData.url = request.url;
  analysisData.params.query = parsedURL.query;
  analysisData.path = parsedURL.pathname;

  request.on('end', function(){
    analysisData.params.body = bodyString;
    var analysis = new Analysis(analysisData);
    analysis.displayJSON(response);
  });
  */
  /*TODO
  Une fois le tableau rempli, créer un Object Analysis (new Analysis(analysisData)
  et appeler la méthode displayJSON sur cet objet (il prend en paramètre
  l'objet response

  !! - vous devrez surement placer cet appel dans un callback!
   */
  request.on('end', function(){
    var parsedURL = url.parse(request.url,true);
    request.query = parsedURL.query;
    request.url = parsedURL;
    request.body = bodyString;
    var analysis =  new Analysis().analyseRequest(request).displayJSON(response);
  });
  /*TODO
  changer ensuite le code pour que ces informations soient disponible dans
  l'object request directement (ajouter/modifier dynamiquement des propriétés)
  utiliser analysis comme ceci une fois que votre objet request est surchargé:
  var analysis = new Analysis().analyseRequest(request).displayJSON(response);
  */
}

var server = http.createServer(handleRequest);
server.listen(8888);

console.log('server started');
