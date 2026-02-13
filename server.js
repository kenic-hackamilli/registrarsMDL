// server.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const registrarRoutes = require('./routes/registrarRoute');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/registrar', registrarRoutes);

// Health check
app.get('/', (req, res) => res.send('Registrar Service running'));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Registrar Service running on port ${PORT}`));
