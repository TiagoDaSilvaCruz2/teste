const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Importe o módulo 'path'

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configure o Express para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Defina a rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Defina a lógica para o socket.io
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');
  
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Inicie o servidor na porta 3000
const PORT = process.env.PORT || 3000; // Usa a porta 3000 ou uma porta definida na variável de ambiente PORT
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});