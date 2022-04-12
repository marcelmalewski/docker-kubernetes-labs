'use strict';

const express = require('express');
const config = require('./conf');

// const { Pool } = require('pg');

// const pgClient = new Pool({
//   user: config.postgresUser,
//   host: config.postgresHost,
//   database: config.postgresDB,
//   password: config.postgresPassword
// })

// pgClient.on('error', () => console.log('Cannot connect do PG'))
// pgClient
//   .query('CREATE TABLE IF NOT EXISTS values (number INT)')
//   .catch(err => console.log(err))

const app = express();

//const PORT = process.env.PGPORT;
const PORT = 4000;


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log('Listening on port 4000');
});