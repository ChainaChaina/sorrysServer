const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Replace <db_password> with your actual database password
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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

require("./app/routes/routes")(app);