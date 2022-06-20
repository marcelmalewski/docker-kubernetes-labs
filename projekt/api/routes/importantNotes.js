const express = require('express');
const router = express.Router();
const ImportantNote = require('../models/ImportantNote');

//REDIS-----------------------------------------------------------------------------
const Redis = require("ioredis");

// port: process.env.REDIS_PORT,
// host: process.env.REDIS_HOST
require('dotenv').config();

console.log(process.env.REDIS_PORT);

const dbConnData = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_URL
}

const rdClient = new Redis(dbConnData);


rdClient.on('connect', function() {
  console.log('Redis connected');
});
//------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  var importantNotesKeys = [];
  var importantNotes = [];
  var gotFromRedis = false

  //próbujemy pobrać z redisa
  await rdClient.keys('importantNote*', (err, rep) => {
    if(rep.length > 0) {
      gotFromRedis = true;
      importantNotesKeys = rep;
    }
  });

  if(gotFromRedis){
    // console.log("uzywamy redis: ");
    let totalCount = importantNotesKeys.length;
    let count = 0;
    
    importantNotesKeys.forEach(async note => {
      await rdClient.get(note, (err, rep) => {
        if(rep != null) {
          importantNotes.push(JSON.parse(rep));
          count++;
        }

        if(count == totalCount){
          return res.send({
            importantNotes: importantNotes
          });
        }
      });
    });

  } else {
    //jak nie ma w redisie to pobieramy z mongo
    importantNotes = await ImportantNote.find();
    // console.log("uzywamy mongo: ");

    //i zapisujemy w redisie
    if(importantNotes.length > 0){
      let totalCount = importantNotes.length;
      let count = 0;

      importantNotes.forEach(async note => {
        await rdClient.set(`importantNote${note._id}`, JSON.stringify(note));
        count++;

        if(count == totalCount){
          return res.send({
            importantNotes: importantNotes
          });
        }
      });
    } else {
      //jezeli nic nie zapisujemy to trzeba zwrocic nic
      return res.send({
        importantNotes: importantNotes
      });
    }
  }
});

router.post('/', async (req, res) => {
  const importantNote = new ImportantNote({
    content: req.body.content
  });

  try {
    //zapisujemy w mongo
    const newImportantNote = await importantNote.save();
    //zapisujemy w redisie
    await rdClient.set(`importantNote${newImportantNote._id}`, JSON.stringify(newImportantNote));
    
    return res.send(newImportantNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:id', getImportantNote, async (req, res) => {
  try {
    //usuwamy w mongo
    await res.importantNote.remove();
    //usuwamy w redisie
    await rdClient.del(`importantNote${req.params.id}`);

    return res.send({
      deletedImportantNoteId: res.importantNote.id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

async function getImportantNote(req, res, next){
  let importantNote;

  try {
      importantNote = await ImportantNote.findById(req.params.id)
      if (importantNote == null) {
         return res.status(404).json({ message: 'Cant find the note'});
      }
  } catch (err) {
    return res.status(500).json({ message: err.message});
  }

  res.importantNote = importantNote;
  next();
}


module.exports = router;