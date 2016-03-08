var fs = require('fs');

fs.readdir('./', function(err,files){
	console.log('Files in current folder:',files);
	for(var i=0; i<files.length; i++) {
		fs.readFile('./'+files[i], {encoding:'utf-8'}, function(err,data){
			console.log('Data in file '+i+': '+data);
		})
	}
	console.log('COUCOU');
})