// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('socketio', io);
require('./config/mongoose');



// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  http.listen(config.port, () => {
    console.log("hek")
    console.info(`server started on port ${config.port} (${config.env})`);
  });

  io.on('connection', function (socket) {
    console.log('an user connected');
  });
  
}


module.exports = app;
