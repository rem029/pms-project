const express = require('express');
const app = express();
const cors = require('cors');
const login = require('../routes/login');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/login', login);

//Default routes
app.get('/', async (req, res) => {
  res.send(`<h1>Its online!!!</h1>`);
});

app.get('/favicon.ico', async (req, res) => {
  res.redirect('/');
});

module.exports = app;
