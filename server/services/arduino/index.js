import io from '../socket'

var log  = require("../../utils/log")(module);

io.on('connection', function (socket) {
  log.info("######## connected to chats #########")

  // socket.on('chat-started', function (room) {
  //   socket.join(room);
  // });
  //
  // socket.on('chat-ended', function (room) {
  //   socket.leave(room);
  // });
  //
  // socket.on('message', function(room,msg){
  //   io.sockets.in(room).emit('message',msg);
  // })
});
