const { Schema, model } = require('mongoose');

const importantNoteSchema = new Schema({
    content: String
});

module.exports = model('ImportantNote', importantNoteSchema);