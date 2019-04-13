var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    WebSocketServer = require('uws').Server,
    wss = new WebSocketServer({
        port: 8000,
        clientTracking: true
    });

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var listenport = 80
http.listen(listenport, function() {
    console.log('listening on *:' + listenport);
});

const WebSocket = require('ws');
 
//const wss = new WebSocket.Server({ port: 8080 });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  //ws.send('message:' +message);
  //wss.clients.forEach(function each(client) {
  	//ws.send('message:' +message);
  	wss.broadcast('message:' +message);
  	
  	//});
  });

});
wss.broadcast = function broadcast(msg) {
   console.log(msg);
   wss.clients.forEach(function each(client) {
       client.send(msg);
    });
};