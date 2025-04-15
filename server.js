const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { createServer } = require('http');
const { parse } = require('url');

const app = express();
const PORT = 3000;

const mongoURI = process.env.MONGO_URI;
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Basic route
app.get('/', (req, res) => {
    res.send('Node server is running!');
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to this application, we on!" });
  });

// Start the server
const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  app(req, res, parsedUrl); // Passa o controle para o Express
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

require("./app/routes/routes")(app);

module.exports = server;