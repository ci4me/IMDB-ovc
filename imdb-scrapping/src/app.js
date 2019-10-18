const apiRoute = require('./apiRoute');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/:movieId', apiRoute);

module.exports = app;