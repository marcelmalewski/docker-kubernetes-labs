const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    content: String
});

module.exports = model('Note', noteSchema);