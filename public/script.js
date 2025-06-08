const socket = io();

let username = '';
let userColor = '';

// Ask for name
while (!username) {
  username = prompt("Enter your name to join the chat:");
}

// Generate a random color for the user
function getRandomColor() {
  const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'];
  return colors[Math.floor(Math.random() * colors.length)];
}

userColor = getRandomColor();

// Notify server of username
socket.emit('join', username);

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit('chat message', {
      name: username,
      color: userColor,
      message: input.value
    });
    input.value = '';
  }
});

socket.on('chat message', function (data) {
  const item = document.createElement('li');
  item.innerHTML = `<strong style="color:${data.color}">${data.name}:</strong> ${data.message}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
