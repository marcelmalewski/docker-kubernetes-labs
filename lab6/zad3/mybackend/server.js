'use strict';

const express = require('express');
const config = require('./conf');

const app = express();

//const PORT = process.env.PGPORT;
const PORT = 4000;


app.get('/', (req, res) => {
  res.send('Hello Worlddd');
});

app.listen(PORT, () => {
  console.log('Listening on port 4000');
});