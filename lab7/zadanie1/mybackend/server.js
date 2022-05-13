'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PGPORT | 5001;
// const PORT = 5001;

app.get('/', (req, res) => {
  res.send('Helldd');
});

app.listen(PORT, () => {
  console.log('Listening on port 5001');
});