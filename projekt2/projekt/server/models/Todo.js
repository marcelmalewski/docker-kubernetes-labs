const mongoose = require("mongoose")

const ToDoSchema = new mongoose.Schema({
    content: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

const ToDo = mongoose.model('ToDos', ToDoSchema);

module.exports = ToDo;