const express = require('express');
const mongoose = require('mongoose');
const notes = require('./routes/notes');
const app = express();

app.use(express.json());
app.use('/notes', notes);

require('dotenv').config();
const mongoConnData = {
   host: process.env.MONGO_HOST,
   port: process.env.MONGO_PORT,
   database: process.env.MONGO_DATABASE
};

mongoose
  .connect(`mongodb://${mongoConnData.host}:${mongoConnData.port}/${mongoConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

