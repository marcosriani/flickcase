const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

// Middleware
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const routes = require('./routes');

require('dotenv').config();

const app = express();

// Parsing
app.use(bodyParser.json());

// Sanitize
app.use(xss());
app.use(mongoSanitize());

// Middleware
const { handleError, convertToApiError } = require('./middleware/apiArror');

// Routes
app.use('/api', routes);

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;

// Error handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

mongoose.connect(mongoUri);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${3001}`);
});
