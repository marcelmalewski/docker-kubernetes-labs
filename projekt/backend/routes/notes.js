const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');

redis.on("connect", () => {
  console.log('connected to Redis');
});

router.get('/', async (req, res) => {
  const notes = await Note.find()

  return res.send({
      notes: notes
    });
});

router.post('/', async (req, res) => {
  const note = new Note({
    content: req.body.content
  });

  try {
    const newNote = await note.save();
    
    return res.send(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:id', getNote, async (req, res) => {
  try {
    await res.note.remove()

    return res.send({
      deletedNoteId: res.note.id
    });

  } catch (err) {
    res.status(500).json({ message: err.message })
  }

});

async function getNote(req, res, next){
  let note;

  try {
    note = await Note.findById(req.params.id)
    if (note == null) {
      return res.status(404).json({ message: 'Cant find the note'});
    }
  } catch (err) {
    return res.status(500).json({ message: err.message});
  }

  res.note = note;
  next();
}


module.exports = router;