const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { GoogleGenAI } = require("@google/generative-ai"); // fixed import
require('dotenv').config();

const app = express();
const PORT = 3000;

// Setup Gemini
const genAI = new GoogleGenAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // update to your model
const systemInstruction = "You are JARVIS, a helpful AI assistant.";

// Serve basic route
app.get('/', (req, res) => {
  res.send('WebSocket + Gemini AI server running 🚀');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('🟢 Client connected');

  ws.send('👋 Welcome to the JARVIS WebSocket Server');

  ws.on('message', async (rawMessage) => {
    const message = rawMessage.toString();
    console.log('📩 Received:', message);

    try {
      const result = await model.generateContent([
        { role: "user", parts: [{ text: message }] },
        { role: "model", parts: [{ text: systemInstruction }] }
      ]);

      const response = result.response.text();
      console.log('🤖 Gemini says:', response);

      ws.send(`🧠 JARVIS: ${response}`);
    } catch (err) {
      console.error('❌ Gemini Error:', err.message);
      ws.send('⚠️ Sorry, an error occurred while generating a response.');
    }
  });

  ws.on('close', () => {
    console.log('🔴 Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
