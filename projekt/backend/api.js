const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const notes = require('./routes/notes');
const importantNotes = require('./routes/importantNotes');

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use('/notes', notes);
app.use('/important-notes', importantNotes);

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

