import socket from 'socket.io'
var server = require('../http').server
var io = socket.listen(server);

export default io
