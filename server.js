var http = require('http');
var url = require('url');
var items = [];

var show = function(response) {
  var html = '<html><head><title>Todo List</title></head><body>'
           + '<h1>Todo List</h1>'
           + '<ul>'
           + items.map(function(item){
              return '<li>' + decodeURIComponent(item) + '</li>'
             }).join('')
           + '</ul>'
           + '<form method="post" action="/">'
           + '<p><input type="text" name="item" /></p>'
           + '<p><input type="submit" value="Add Item" /></p>'
           + '</form></body></html>';
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Content-Length', Buffer.byteLength(html));
  response.end(html);
};

var server = http.createServer(function(request, response){
  switch (request.method) {
    case 'POST':
      var item = '';
      request.setEncoding('utf8');
      
      request.on('data', function(chunk) {
        item += chunk;
      });
      
      request.on('end', function() {
        items.push(item);
        response.setHeader('Location', 'http://winterfell-nodejs-86923.euw1.nitrousbox.com/');
        response.setHeader('Content-Type', 'text/plain');
        response.statusCode = 302;
        response.end();
      });
      
      break;
    case 'GET':
      show(response);
      break;
  }
});

server.listen(3000);