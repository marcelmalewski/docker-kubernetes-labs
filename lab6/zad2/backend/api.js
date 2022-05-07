'use strict';

const express = require('express');
const { Pool } = require('pg');

//redis łączenie---------------------------------------------------------------------------------------
const Redis = require("ioredis");

const dbConnData = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || 'myredis',
};

const rdClient = new Redis(dbConnData);

rdClient.on('connect', function() {
  console.log('Connected!');
});

rdClient.on('error', (err) => {
  console.log(`Error ${err}`)
})

//postgres łączenie---------------------------------------------------------------------------------------
const pgClient = new Pool({
  user: process.env.postgresUser || "myuser",
  host: process.env.postgresHost || "postgresDB",
  database: process.env.postgresDB || "mydb",
  password: process.env.postgresPassword || "mypassword",
  posrt: process.env.port || 5431
})

pgClient.on('error', () => console.log('Cannot connect do PG'))

// pgClient
//   .query('DROP TABLE IF EXISTS values')
//   .catch(err => console.log(err))

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number1 INT, number2 INT, nwd INT)')
  .catch(err => console.log(err))


//app ---------------------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 4000;

function NWD(a,b){
  var q;
  while (b != 0){
    q = a;
    a = b;
    b = q % b;
  }

 return a;
}

app.get('/api', async (req, res) => {
  // const number1 = req.body
  // const number2 = req.body.number1
  const number1 = 5
  const number2 = 8
  let nwd = 0;
  let gotFromRedis = false

  //szukamy w redisie------------------------------------------------------------
  await rdClient.get(number1 + " " + number2, (err, rep) => {
    if(rep != null) {
      console.log("uzywamy redis")
      //jest to zwroc
      gotFromRedis = true;
      nwd = rep
    } else {
      console.log("dodajemy do redis")
      //nie ma to dodaj
      nwd = NWD(number1, number2)

      rdClient.set(number1 + " " + number2, nwd)
    }
  })

  //szukamy w postgres------------------------------------------------------------

  if(!gotFromRedis) {
      console.log("uzywamy postgres")

      const query = `
        SELECT *
        FROM values
        WHERE number1 = $1 AND number2 = $2
      `;

      pgClient.query(query, [number1, number2], (error, data) => {
      if (data.rowCount == 0) {
        //nie ma 
        console.log("not found");
        //trzeba dodac
        nwd = NWD(number1, number2);

        pgClient.query('INSERT INTO values (number1, number2, nwd) VALUES ($1, $2, $3)', [number1, number2, nwd], (error, results) => {
          if (error) {
            throw error;
          } else {
            console.log("dodajemy do postgres")
          }
        });

        res.send(nwd.toString());
      } else {
        //jest to zwracamy
        nwd = data.rows[0].nwd;

        res.send(nwd.toString());
      }
    });
  } else {
    res.send(nwd.toString());
  }

});

app.listen(PORT, () => {
  console.log('Listening on port 4000');
});