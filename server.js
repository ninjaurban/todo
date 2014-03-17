var http = require('http');
var url = require('url');

var items = [];

var server = http.createServer(function(request, response) {
	switch (request.method) {
		case 'POST':
			var item = '';
			request.setEncoding('utf8');

			request.on('data', function(chunk) {
				item += chunk;
			});

			request.on('end', function() {
				items.push(item);
				response.end('OK\n');
			});

			break;

		case 'GET':
			response.end('Kom ihåg' + items.join(', ') + '\n');
			break;
	}
});

server.listen(3000);
