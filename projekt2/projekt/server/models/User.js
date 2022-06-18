const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    }
})

const User = mongoose.model('User', usersSchema);
module.exports = User;