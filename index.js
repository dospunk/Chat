const express = require('express');
const sio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = sio(server);

app.get('/', function(req, res){
  res.sendFile('./home.html', {root: __dirname});
});

io.on('connection', function(socket){
	console.log("a user connected with ID " + socket.id);
	socket.on('msg', function(msg){
		io.emit('msg', name + ": " + msg.message);
	});
	socket.on('set-name', function(nickname){
		name = nickname;
	});
	io.on('disconnect', function(){
		console.log("user " + socket.id + " disconnected");
	});
});

server.listen(5000, function(){
  console.log('listening on *:5000');
});