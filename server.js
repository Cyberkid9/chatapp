const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Store the username on the socket when they join
  socket.on('join', (username) => {
    socket.username = username;
    console.log(`${username} joined the chat`);
    io.emit('chat message', {
      name: 'System',
      color: '#888',
      message: `${username} joined the chat`
    });
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.username || 'Unknown'}`);
    if (socket.username) {
      io.emit('chat message', {
        name: 'System',
        color: '#888',
        message: `${socket.username} left the chat`
      });
    }
  });
});

http.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
