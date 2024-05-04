const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    }
});

module.exports = model('user', userSchema);