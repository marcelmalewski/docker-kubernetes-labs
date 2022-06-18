const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const notes = require('./routes/notes');
// const importantNotes = require('./routes/importantNotes');

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use('/notes', notes);
// app.use('/important-notes', importantNotes);

require('dotenv').config();

mongoose
  .connect(`mongodb://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`API server listening ${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

