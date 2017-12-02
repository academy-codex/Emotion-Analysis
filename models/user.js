var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    }
});

module.exports = {User};