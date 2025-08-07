const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const PORT = 3000;

// Serve a basic page (optional)
app.get('/', (req, res) => {
  res.send('WebSocket server is running 🚀');
});

const server = http.createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('🟢 New client connected');

  ws.send('👋 Welcome to WebSocket server!');

  ws.on('message', (message) => {
    console.log(`📩 Received: ${message}`);
    ws.send(`🔁 Echo: ${message}1`);
    ws.send(`🔁 Echo: ${message}2`);
  });

  ws.on('close', () => {
    console.log('🔴 Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 HTTP + WebSocket server running at http://localhost:${PORT}`);
});
