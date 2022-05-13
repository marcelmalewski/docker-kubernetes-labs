'use strict';

const express = require('express');

const app = express();

//const PORT = process.env.PGPORT;
const BACKENDPORT = process.env.BACKENDPORT | 4000;


app.get('/', (req, res) => {
  res.send('new from backend');
});

app.listen(BACKENDPORT, () => {
  console.log('Listening on port 4000');
});